import prisma from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import TicketDetails from "./TicketDetails";
import TicketEditButton from "./TicketEditButton";
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
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
        <TicketDetails ticket={ticket} />
      </Box>
      <Box>
        <TicketEditButton ticketId={ticket.id} />
      </Box>
    </Grid>
  );
};

export default TicketDetailPage;
