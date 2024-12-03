'use client'
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

const CreateTicketPage = () => {

  type TicketForm = z.infer<typeof createTicketSchema>;

  const [error, setError] = useState("");

  const { register, control, handleSubmit, formState:{errors} } = useForm<TicketForm>({
    resolver: zodResolver(createTicketSchema)
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
      <form className="space-y-5"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post(`/api/tickets`, data);
            router.push(`/tickets`);
          } catch (error) {
            setError("Unexpected error occured.");
          }
        })}
      >
        <TextField.Root placeholder="Title" {...register("title")} />
        {errors.title && <Text color="red" as="p">{errors.title.message}</Text>}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        {errors.description && <Text color="red" as="p">{errors.description.message}</Text>}
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
        {errors.priority && <Text color="red" as="p">{errors.priority.message}</Text>}

        <Button>Add new ticket</Button>
      </form>
    </div>
  );
};

export default CreateTicketPage;
