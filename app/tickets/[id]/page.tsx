import { TicketPriorityBadge, TicketStatusBadge } from "@/app/components/";
import prisma from "@/prisma/client";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Box, Button, Card, Flex, Grid, Heading } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
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
    <Grid columns={{initial: "1", md: "2"}} gap="5">
      <Box>
        <Heading>{ticket.title}</Heading>
        <Flex gap="3" my="2">
          <TicketStatusBadge status={ticket.status} />
          <TicketPriorityBadge priority={ticket.priority} />
          <p>{ticket.createdAt.toDateString()}</p>
        </Flex>
        <Card className="prose" mt="5"> 
          <ReactMarkdown>{ticket.description}</ReactMarkdown>
        </Card>
      </Box>
      <Box>
        <Button>
            <Pencil2Icon/>
          <Link href={`/tickets/${ticket.id}/edit`}>
            Edit ticket
          </Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default TicketDetailPage;
