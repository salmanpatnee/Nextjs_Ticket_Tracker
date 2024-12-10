import { TicketPriorityBadge, TicketStatusBadge } from "@/app/components";
import { Ticket } from "@prisma/client";
import { Card, Flex, Heading } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";

const TicketDetails = ({ ticket }: { ticket: Ticket }) => {
  return (
    <>
      <Heading>{ticket.title}</Heading>
      <Flex gap="3" my="2">
        <TicketStatusBadge status={ticket.status} />
        <TicketPriorityBadge priority={ticket.priority} />
        <p>{ticket.createdAt.toDateString()}</p>
      </Flex>
      <Card className="prose max-w-full" mt="5">
        <ReactMarkdown>{ticket.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default TicketDetails;
