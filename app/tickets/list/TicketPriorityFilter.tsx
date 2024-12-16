"use client";
import { Priority, Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const priorities: { label: string; value?: Priority }[] = [
  { label: "Filter by Priority..." },
  { label: "Low", value: "LOW" },
  { label: "Medium", value: "MEDIUM" },
  { label: "High", value: "HIGH" },
  { label: "Critical", value: "CRITICAL" },
];

const TicketPriorityFilter = () => {
  const router = useRouter();

  const searchParmas = useSearchParams();

  return (
    <Select.Root defaultValue={searchParmas.get('priority') || "0"}
      onValueChange={(priority) => {
        const params = new URLSearchParams();

        if(priority) {
          params.append('priority', priority)
        }

        if(searchParmas.get('orderBy')){
          params.append('orderBy', searchParmas.get('orderBy')!)
        }

        if(searchParmas.get('status')){
          params.append('status', searchParmas.get('status')!)
        }

        const query = params.size ? `?${params.toString()}` : ''

        router.push(`/tickets/list${query}`);
      }}
    >
      <Select.Trigger placeholder="Filter by Priority..."></Select.Trigger>
      <Select.Content>
        {priorities.map((priority) => (
          <Select.Item key={priority.label} value={priority.value || "0"}>
            {priority.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default TicketPriorityFilter;
