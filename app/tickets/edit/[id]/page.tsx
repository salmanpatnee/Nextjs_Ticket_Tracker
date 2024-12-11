import prisma from "@/prisma/client";
import dynamic from 'next/dynamic';
import { notFound } from "next/navigation";
import TicketFormSkeleton from '@/app/tickets/_components/TicketFormSkeleton';

const TicketForm = dynamic(() => import('@/app/tickets/_components/TicketForm'), {
  ssr: false, 
  loading: () => <TicketFormSkeleton/>
} );

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
