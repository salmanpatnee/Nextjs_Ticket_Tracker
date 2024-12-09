import { TicketPriorityBadge, TicketStatusBadge } from "@/app/components/";
import prisma from "@/prisma/client";
import { Card, Flex, Heading } from "@radix-ui/themes";
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
    <div>
      <Heading>{ticket.title}</Heading>
      <Flex gap="3" my="2">
        <TicketStatusBadge status={ticket.status} />
        <TicketPriorityBadge priority={ticket.priority} />
        <p>{ticket.createdAt.toDateString()}</p>
      </Flex>
      <Card className="prose" mt="5"> 
        <ReactMarkdown>{ticket.description}</ReactMarkdown>
      </Card>
    </div>
  );
};

export default TicketDetailPage;
