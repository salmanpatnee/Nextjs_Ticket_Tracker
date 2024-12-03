import { Priority } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

interface Props {
  priority: Priority;
}

const priorityMap: Record<
  Priority,
  { label: string; color: "red" | "yellow" | "green" | "orange" }
> = {
  LOW: { label: "Low", color: "green" },
  MEDIUM: { label: "Medium", color: "yellow" },
  HIGH: { label: "High", color: "orange" },
  CRITICAL: { label: "Critical", color: "red" },
};

const TicketPriorityBadge = ({ priority }: Props) => {
  return (
    <Badge color={priorityMap[priority].color}>
      {priorityMap[priority].label}
    </Badge>
  );
};

export default TicketPriorityBadge;
