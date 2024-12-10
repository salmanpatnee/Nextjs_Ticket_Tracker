"use client";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { ticketSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Ticket } from "@prisma/client";
import { Button, Callout, Select, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { MdErrorOutline } from "react-icons/md";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";

interface Props {
    ticket?: Ticket
}

const TicketForm =  ({ticket}: Props) => {

  type TicketFormData = z.infer<typeof ticketSchema>;

  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
  });
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      await axios.post(`/api/tickets`, data);
      router.push(`/tickets`);
    } catch (error) {
      setSubmitting(false);
      setError("Unexpected error occured.");
    }
  });

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
      <form className="space-y-5" onSubmit={onSubmit}>
        <TextField.Root placeholder="Title" {...register("title")} defaultValue={ticket?.title} />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description" defaultValue={ticket?.description}
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Controller defaultValue={ticket?.priority}
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

export default TicketForm;
