import React from "react";
import { Button, TextArea, TextField, Select } from "@radix-ui/themes";

const CreateTicketPage = () => {
  return (
    <div className="max-w-xl space-y-5">
      <TextField.Root placeholder="Title" />
      <TextArea placeholder="Description" />
      <Button>Add new issue</Button>
    </div>
  );
};

export default CreateTicketPage;
