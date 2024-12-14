'use client'
import { Status } from '@prisma/client';
import { Select } from "@radix-ui/themes";

const statuses: {label: string, value?: Status}[] = [
    {label: 'All'}, 
    {label: 'Open', value: 'OPEN'}, 
    {label: 'In Progress', value: 'IN_PROGRESS'}, 
    {label: 'Closed', value: 'CLOSED'}, 
]

const TicketStatusFilter = () => {
  return (
    <Select.Root>
        <Select.Trigger placeholder='Filter by Status...'></Select.Trigger>
            <Select.Content>
                {statuses.map((status) =>  <Select.Item key={status.label} value={status.value || "0"}>{status.label}</Select.Item>)}
            </Select.Content>
    </Select.Root>
  )
}

export default TicketStatusFilter