import { Icon, Input as NativeBaseInput, useTheme } from "native-base";
import { MagnifyingGlass, Microphone } from "phosphor-react-native";

export function SearchInput() {
  const { colors } = useTheme();
  return (
    <NativeBaseInput
      bg="white"
      opacity={50}
      placeholder=""
      width="85%"
      borderRadius="4"
      py="3"
      px="1"
      fontSize="14"
      InputLeftElement={
        <Icon
          m="2"
          ml="3"
          size="6"
          color={colors.gray[1]}
          as={<MagnifyingGlass />}
        />
      }
      InputRightElement={
        <Icon
          m="2"
          mr="3"
          size="6"
          color={colors.gray[1]}
          as={<Microphone />}
        />
      }
    />
  );
}
