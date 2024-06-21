import { Spinner } from "@chakra-ui/react";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
    />
  );
}
