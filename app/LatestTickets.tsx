import prisma from "@/prisma/client";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import Link from "next/link";
import { TicketPriorityBadge, TicketStatusBadge } from "./components";

const LatestTickets = async () => {
  const tickets = await prisma.ticket.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      assignedToUser: true,
    },
  });

  return (
    <Card>
      <Heading size="4" mb="5">
        Latest Tickets
      </Heading>
      <Table.Root>
        <Table.Body>
          {tickets.map((ticket) => {
            return (
              <Table.Row key={ticket.id}>
                <Table.Cell>
                  <Flex justify="between">
                    <Flex direction="column" align="start" gap="2">
                      <Link href={`tickets/${ticket.id}`}>{ticket.title}</Link>
                      <Flex gap="2">
                        <TicketStatusBadge status={ticket.status} />
                        <TicketPriorityBadge priority={ticket.priority} />
                      </Flex>
                    </Flex>
                    {ticket.assignedToUser && (
                      <Avatar
                        src={ticket.assignedToUser.image!}
                        fallback="?"
                        size="2"
                        radius="full"
                      />
                    )}
                  </Flex>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestTickets;
