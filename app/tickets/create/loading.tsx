import { Skeleton } from "@/app/components";
import { Box } from "@radix-ui/themes";

const TicketCreateLoadingPage = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Skeleton height="20rem"/>
    </Box>
  );
};

export default TicketCreateLoadingPage;