import { Skeleton } from "@/app/components";
import { Box } from "@radix-ui/themes";

const TicketFormSkeleton = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton height="2rem" />
      <Skeleton height="20rem"/>
      <Skeleton height="2rem"/>
      <Skeleton height="2rem" width="10rem"/>
    </Box>
  );
};

export default TicketFormSkeleton;