import { Link, TicketPriorityBadge, TicketStatusBadge } from "@/app/components";
import NextLink from "next/link";
import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import TicketActions from "./TicketActions";
import { Priority, Status, Ticket } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import Pagination from "@/app/components/Pagination";
interface Props {
  searchParams: {
    status: Status;
    priority: Priority;
    orderBy: keyof Ticket;
    page: string;
  };
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

  const where = { status, priority };

  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const tickets = await prisma.ticket.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const ticketCount = await (await prisma.ticket.count({ where }))

  return (
    <div>
      <TicketActions />
      <Table.Root variant="surface" mb="5">
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
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={ticketCount}
      />
    </div>
  );
};
export const dynamic = "force-dynamic";
export default TicketsPage;
