import { Priority, Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
  low: number;
  medium: number;
  high: number;
  critical: number;
}

const TicketSummary = ({
  open,
  inProgress,
  closed,
  low,
  medium,
  high,
  critical,
}: Props) => {
  const statuses: {
    label: string;
    value: number;
    status: Status;
  }[] = [
    { label: "Open Tickets", value: open, status: "OPEN" },
    {
      label: "In-progress Tickets",
      value: inProgress,
      status: "IN_PROGRESS",
    },
    { label: "Closed Tickets", value: closed, status: "CLOSED" },
  ];

  const priorities: {
    label: string;
    value: number;
    priority: Priority;
  }[] = [
    { label: "Low Priorities", value: low, priority: "LOW" },
    { label: "Medium Priorities", value: medium, priority: "MEDIUM" },
    { label: "High Priorities", value: high, priority: "HIGH" },
    { label: "Critical Priorities", value: critical, priority: "CRITICAL" },
  ];

  return (
    <Flex direction="column" gap="3">
      <Flex gap="4">
        {statuses.map((status) => (
          <Card key={status.label}>
            <Flex direction="column" gap="1">
              <Link
                className="text-sm font-medium"
                href={`/tickets/list?status=${status.status}`}
              >
                {status.label}
              </Link>
              <Text size="5" className="font-bold">
                {status.value}
              </Text>
            </Flex>
          </Card>
        ))}
      </Flex>
      <Flex gap="4">
        {priorities.map((priority) => (
          <Card key={priority.label}>
            <Flex direction="column" gap="1">
              <Link
                className="text-sm font-medium"
                href={`/tickets/list?priority=${priority.priority}`}
              >
                {priority.label}
              </Link>
              <Text size="5" className="font-bold">
                {priority.value}
              </Text>
            </Flex>
          </Card>
        ))}
      </Flex>
    </Flex>
  );
};

export default TicketSummary;
