import React from "react";
import TicketForm from "../../_components/TicketForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}
const TicketEditPage = async ({ params }: Props) => {
  const ticket = await prisma.ticket.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!ticket) {
    return notFound();
  }

  return <TicketForm ticket={ticket}/>;
};

export default TicketEditPage;
