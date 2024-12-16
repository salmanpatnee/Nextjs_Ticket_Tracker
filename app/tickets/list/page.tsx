
import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { Priority, Status } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";
import TicketActions from "./TicketActions";
import TicketTable, { columnNames, TicketQuery } from "./TicketTable";
interface Props {
  searchParams: TicketQuery
}

const TicketsPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const priorities = Object.values(Priority);
  const priority = priorities.includes(searchParams.priority)
    ? searchParams.priority
    : undefined;

  const where = { status, priority };

  // Validation the column names for sorting
  // Only works on the avaiable column names
  const orderBy = columnNames.includes(searchParams.orderBy)
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

  const ticketCount = await await prisma.ticket.count({ where });

  return (
    <Flex direction="column" gap="3">
      <TicketActions />
      <TicketTable tickets={tickets} searchParams={searchParams} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={ticketCount}
      />
    </Flex>
  );
};
export const dynamic = "force-dynamic";
export default TicketsPage;

export const metadata: Metadata = {
  title: "Trackify | Manage and Track Support Tickets",
  description: "Access and manage all your tickets in one place. Filter, sort, and search by ticket status, priority, and assignee to efficiently track and resolve support requests.",
};