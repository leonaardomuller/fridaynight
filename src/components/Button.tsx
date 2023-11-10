import { Button as NativeBaseButton, IButtonProps, Heading } from "native-base";
interface Props extends IButtonProps {
  title: string;
}
export function Button({ title, variant, ...rest }: Props) {
  return (
    <NativeBaseButton
      w="85%"
      alignSelf="center"
      bg={variant === "secondary" ? "gray.3" : "purple.1"}
      h={14}
      mb={8}
      fontSize="sm"
      _pressed={{ bg: "gray.2" }}
      rounded="xl"
      zIndex={1}
      position="absolute"
      bottom="0"
      {...rest}
    >
      <Heading
        color={variant === "secondary" ? "purple.1" : "gray.3"}
        fontSize="md"
      >
        {title}
      </Heading>
    </NativeBaseButton>
  );
}
