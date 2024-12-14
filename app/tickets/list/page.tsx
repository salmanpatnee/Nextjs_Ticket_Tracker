import { Link, TicketPriorityBadge, TicketStatusBadge } from "@/app/components";
import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import TicketActions from "./TicketActions";
import { Priority, Status } from "@prisma/client";
interface Props {
  searchParams : {status: Status, priority: Priority}
}

const TicketsPage = async ({searchParams}: Props) => {

  const statuses = Object.values(Status)
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;

  const priorities = Object.values(Priority)
  const priority = priorities.includes(searchParams.priority) ? searchParams.priority : undefined;

  const tickets = await prisma.ticket.findMany({
    where: {status, priority}
  });
  
  return (
    <div>
      <TicketActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Ticket</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Priority
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {tickets.map((ticket) => (
            <Table.Row key={ticket.id}>
              <Table.Cell>
                <Link href={`/tickets/${ticket.id}`}>
                  {ticket.title}
                </Link>
                <div className="block md:hidden">
                  <TicketStatusBadge status={ticket.status} />{" "}
                  <TicketPriorityBadge priority={ticket.priority} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <TicketStatusBadge status={ticket.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <TicketPriorityBadge priority={ticket.priority} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {ticket.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};
export const dynamic = 'force-dynamic';
export default TicketsPage;
