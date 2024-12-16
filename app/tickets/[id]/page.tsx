import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import AssigneeSelect from "./AssigneeSelect";
import TicketDeleteButton from "./TicketDeleteButton";
import TicketDetails from "./TicketDetails";
import TicketEditButton from "./TicketEditButton";
interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props) {
  const ticket = await prisma.ticket.findUnique({ where: { id: parseInt(params.id) }});
  return {
    title: ticket?.title,
    description: 'Get detailed information about specific tickets, including descriptions, status updates, comments, and attachments. Easily manage and update ticket progress for seamless issue resolution.'
  }
}

const TicketDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);

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
      {session && (
        <Box className="col-span-1">
          <Flex direction="column" gap="3">
          <AssigneeSelect ticket={ticket} />
            <TicketEditButton ticketId={ticket.id} />
            <TicketDeleteButton ticketId={ticket.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export default TicketDetailPage;
