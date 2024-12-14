import { Box, Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import TicketStatusFilter from "./TicketStatusFilter";

const TicketActions = () => {
  return (
    <Flex mb="5" justify="between">
      <Box>
        <TicketStatusFilter />
      </Box>
      <Box>
        <Button>
          <Link href="/tickets/create">Add new ticket</Link>
        </Button>
      </Box>
    </Flex>
  );
};

export default TicketActions;
