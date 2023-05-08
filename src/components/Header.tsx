import { Heading, HStack, StyledProps } from "native-base";
import { ButtonGoBack } from "./ButtonGoBack";

type Props = StyledProps & {
  title: string;
};

export function Header({ title, ...rest }: Props) {
  return (
    <HStack
      w="full"
      justifyContent="space-between"
      alignItems="center"
      bg="white"
      px={8}
      pb={6}
      pt={12}
      {...rest}
    >
      <ButtonGoBack />

      <Heading color="gray.1" textAlign="center" fontSize="lg" flex={1} ml={-6}>
        {title}
      </Heading>
    </HStack>
  );
}
