import { TicketPriorityBadge, TicketStatusBadge } from "@/app/components";
import { Priority, Status, Ticket } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import { default as Link, default as NextLink } from "next/link";

export interface TicketQuery {
  status: Status;
  priority: Priority;
  orderBy: keyof Ticket;
  page: string;
}

interface Props {
  searchParams: TicketQuery;
  tickets: Ticket[];
}

const TicketTable = ({ searchParams, tickets }: Props) => {
  return (
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
  );
};

const columns: { label: string; value: keyof Ticket; className?: string }[] = [
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
export const columnNames = columns.map((column) => column.value);
export default TicketTable;
