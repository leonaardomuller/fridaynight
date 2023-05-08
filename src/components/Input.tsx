import { Input as NativeBaseInput, IInputProps } from "native-base";

export function Input({ ...rest }: IInputProps) {
  return (
    <NativeBaseInput
      bg="white"
      h={14}
      size="md"
      borderWidth={2}
      borderColor="white"
      fontSize="md"
      fontFamily="body"
      color="gray.1"
      placeholderTextColor="gray.2"
      rounded="2xl"
      _focus={{ borderWidth: 2, borderColor: "gray.1", bg: "white" }}
      {...rest}
    />
  );
}
