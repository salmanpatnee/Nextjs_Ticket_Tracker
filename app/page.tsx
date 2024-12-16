import prisma from "@/prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";
import LatestTickets from "./LatestTickets";
import TicketChart from "./TicketChart";
import TicketSummary from "./TicketSummary";

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
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <TicketSummary
          open={open}
          inProgress={inProgress}
          closed={closed}
          low={low}
          medium={medium}
          high={high}
          critical={critical}
        />
        <TicketChart open={open} inProgress={inProgress} closed={closed} />
      </Flex>
      <LatestTickets />
    </Grid>
  );
}


export const metadata: Metadata = {
  title: "Trackify Dashboard | Overview of Ticket Status",
  description: "View a high-level overview of your ticketing system with key metrics like open, closed, and pending tickets. Monitor trends and recent activities to manage and prioritize tasks efficiently.",
};