"use client";
import { Button, TextField, Select } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

const CreateTicketPage = () => {
  interface TicketForm {
    title: string;
    description: string;
    priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  }

  const { register, control, handleSubmit } = useForm<TicketForm>();
  const router = useRouter()
  return (
    <form
      className="max-w-xl space-y-5"
      onSubmit={ handleSubmit( async (data) => {
        await axios.post(`/api/tickets`, data)
        router.push(`/tickets`)
      })}
    >
      <TextField.Root placeholder="Title" {...register("title")} />
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} />
        )}
      />

      <Controller
        name="priority"
        control={control}
        render={({field}) => (
          <Select.Root size="2" defaultValue="MEDIUM" value={field.value}  onValueChange={field.onChange}>
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

      <Button>Add new ticket</Button>
    </form>
  );
};

export default CreateTicketPage;
