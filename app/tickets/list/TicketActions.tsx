import { Button } from "@radix-ui/themes";
import Link from "next/link";

const TicketActions = () => {
  return (
    <div className="mb-5">
      <Button>
        <Link href="/tickets/create">Add new ticket</Link>
      </Button>
    </div>
  );
};

export default TicketActions;
