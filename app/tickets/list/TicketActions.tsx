import { Box, Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import TicketPriorityFilter from "./TicketPriorityFilter";
import TicketStatusFilter from "./TicketStatusFilter";

const TicketActions = () => {
  return (
    <Flex justify="between">
      <Flex gap="4">
        <TicketStatusFilter />
        <TicketPriorityFilter />
      </Flex>
      
      <Box>
        <Button>
          <Link href="/tickets/create">Add new ticket</Link>
        </Button>
      </Box>
    </Flex>
  );
};

export default TicketActions;
