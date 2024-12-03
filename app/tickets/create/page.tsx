import React from "react";
import { Button, TextArea, TextField, Select } from "@radix-ui/themes";

const CreateTicketPage = () => {
  return (
    <div className="max-w-xl space-y-5">
      <TextField.Root placeholder="Title" />
      <TextArea placeholder="Description" />
      <div className="w-full">
        <Select.Root size="2" defaultValue="MEDIUM">
          <Select.Trigger placeholder="Priority"/>
          <Select.Content>
            <Select.Item value="LOW">Low</Select.Item>
            <Select.Item value="MEDIUM">Medium</Select.Item>
            <Select.Item value="HIGH">Hign</Select.Item>
            <Select.Item value="CRITICAL">Critical</Select.Item>
          </Select.Content>
        </Select.Root>
      </div>
      <Button>Add new ticket</Button>
    </div>
  );
};

export default CreateTicketPage;
