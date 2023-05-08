import { Center, Spinner } from "native-base";

export function Loading() {
  return (
    <Center flex={1} bg="purple.1">
      <Spinner size="large" color="purple.3" />
    </Center>
  );
}
