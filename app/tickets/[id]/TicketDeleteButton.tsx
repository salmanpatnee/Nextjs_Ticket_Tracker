import {  TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const TicketDeleteButton = ({ticketId}: {ticketId: number}) => {
  return (
    <Button color="red">
      <TrashIcon />
      <Link href={`/tickets/${ticketId}/edit`}>Delete</Link>
    </Button>
  );
};

export default TicketDeleteButton;
