import dynamic from 'next/dynamic';
import TicketFormSkeleton from '@/app/tickets/_components/TicketFormSkeleton';

const TicketForm = dynamic(() => import('@/app/tickets/_components/TicketForm'), {
  ssr: false, 
  loading: () => <TicketFormSkeleton/>
} );

const CreateTicketPage = () => {
  return (
    <TicketForm/>
  )
}

export default CreateTicketPage