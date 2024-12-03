"use client";
import { Button, TextField, Select, Callout, Text } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdErrorOutline } from "react-icons/md";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTicketSchema } from "@/app/validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";

const CreateTicketPage = () => {
  type TicketForm = z.infer<typeof createTicketSchema>;

  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TicketForm>({
    resolver: zodResolver(createTicketSchema),
  });
  const router = useRouter();
  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root className="mb-3" color="red">
          <Callout.Icon>
            <MdErrorOutline />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-5"
        onSubmit={handleSubmit(async (data) => {
          try {
            setSubmitting(true);
            await axios.post(`/api/tickets`, data);
            router.push(`/tickets`);
          } catch (error) {
            setSubmitting(false);
            setError("Unexpected error occured.");
          }
        })}
      >
        <TextField.Root placeholder="Title" {...register("title")} />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Controller
          name="priority"
          control={control}
          render={({ field }) => (
            <Select.Root
              size="2"
              defaultValue="MEDIUM"
              value={field.value}
              onValueChange={field.onChange}
            >
              <Select.Trigger placeholder="Priority" />
              <Select.Content>
                <Select.Item value="LOW">Low</Select.Item>
                <Select.Item value="MEDIUM">Medium</Select.Item>
                <Select.Item value="HIGH">High</Select.Item>
                <Select.Item value="CRITICAL">Critical</Select.Item>
              </Select.Content>
            </Select.Root>
          )}
        />
        <ErrorMessage>{errors.priority?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>
          Add new ticket {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default CreateTicketPage;
