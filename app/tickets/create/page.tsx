'use client'
import { Button, TextField, Select, Callout } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdErrorOutline } from "react-icons/md";

const CreateTicketPage = () => {
  interface TicketForm {
    title: string;
    description: string;
    priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  }

  const [error, setError] = useState("");

  const { register, control, handleSubmit } = useForm<TicketForm>();
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

        <Button>Add new ticket</Button>
      </form>
    </div>
  );
};

export default CreateTicketPage;
