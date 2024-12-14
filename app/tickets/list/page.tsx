import { Link, TicketPriorityBadge, TicketStatusBadge } from "@/app/components";
import NextLink from "next/link";
import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import TicketActions from "./TicketActions";
import { Priority, Status, Ticket } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
interface Props {
  searchParams: { status: Status; priority: Priority; orderBy: keyof Ticket };
}

const TicketsPage = async ({ searchParams }: Props) => {
  const columns: { label: string; value: keyof Ticket; className?: string }[] =
    [
      { label: "Ticket", value: "title" },
      { label: "Status", value: "status", className: "hidden md:table-cell" },
      {
        label: "Priority",
        value: "priority",
        className: "hidden md:table-cell",
      },
      {
        label: "Created",
        value: "createdAt",
        className: "hidden md:table-cell",
      },
    ];

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const priorities = Object.values(Priority);
  const priority = priorities.includes(searchParams.priority)
    ? searchParams.priority
    : undefined;

  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;
  // const orderBy = searchParams.orderBy ? {[searchParams.orderBy]: 'asc'} : undefined

  const tickets = await prisma.ticket.findMany({
    where: { status, priority },
    orderBy,
  });

  return (
    <div>
      <TicketActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <NextLink
                  href={{
                    query: { ...searchParams, orderBy: column.value },
                  }}
                >
                  {column.label}
                  {column.value === searchParams.orderBy && (
                    <ArrowUpIcon className="inline" />
                  )}
                </NextLink>
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {tickets.map((ticket) => (
            <Table.Row key={ticket.id}>
              <Table.Cell>
                <Link href={`/tickets/${ticket.id}`}>{ticket.title}</Link>
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
export const dynamic = "force-dynamic";
export default TicketsPage;
