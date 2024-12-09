import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}

const TicketDetailPage = async ({ params }: Props) => {

  const ticket = await prisma.ticket.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if(!ticket) {
    notFound()
  }

  return <div>
    <p>{ticket.title}</p>
    <p>{ticket.status}</p>
    <p>{ticket.priority}</p>
    <p>{ticket.createdAt.toDateString()}</p>
  </div>;
};

export default TicketDetailPage;
