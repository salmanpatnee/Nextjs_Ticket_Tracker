"use client";
import { Priority, Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

const priorities: { label: string; value?: Priority }[] = [
  { label: "All" },
  { label: "Low", value: "LOW" },
  { label: "Medium", value: "MEDIUM" },
  { label: "High", value: "HIGH" },
  { label: "Critical", value: "CRITICAL" },
];

const TicketPriorityFilter = () => {
  const router = useRouter();
  return (
    <Select.Root
      onValueChange={(priority) => {
        const query = priority != "0" ? `?priority=${priority}` : "";
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
