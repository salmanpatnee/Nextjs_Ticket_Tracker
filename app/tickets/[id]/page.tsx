import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import TicketDetails from "./TicketDetails";
import TicketEditButton from "./TicketEditButton";
import TicketDeleteButton from "./TicketDeleteButton";
interface Props {
  params: { id: string };
}

const TicketDetailPage = async ({ params }: Props) => {
  const ticket = await prisma.ticket.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!ticket) {
    notFound();
  }

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <TicketDetails ticket={ticket} />
      </Box>
      <Box className="col-span-1">
        <Flex direction="column" gap="3">
          <TicketEditButton ticketId={ticket.id} />
          <TicketDeleteButton ticketId={ticket.id} />
        </Flex>
      </Box>
    </Grid>
  );
};

export default TicketDetailPage;
