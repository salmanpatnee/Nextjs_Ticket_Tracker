import Image from "next/image";
import LatestTickets from "./LatestTickets";
import TicketSummary from "./TicketSummary";
import prisma from "@/prisma/client";

export default async function Home() {
  const open = await prisma.ticket.count({
    where: { status: "OPEN" },
  });
  const inProgress = await prisma.ticket.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.ticket.count({
    where: { status: "CLOSED" },
  });

  const low = await prisma.ticket.count({
    where: { priority: "LOW" },
  });

  const medium = await prisma.ticket.count({
    where: { priority: "MEDIUM" },
  });

  const high = await prisma.ticket.count({
    where: { priority: "HIGH" },
  });

  const critical = await prisma.ticket.count({
    where: { priority: "CRITICAL" },
  });

  return (
    // <LatestTickets/>
    <TicketSummary
      open={open}
      inProgress={inProgress}
      closed={closed}
      low={low}
      medium={medium}
      high={high}
      critical={critical}
    />
  );
}
