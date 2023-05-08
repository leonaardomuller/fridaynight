import { IconButton, useTheme } from "native-base";
import { CaretLeft } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";

export function ButtonGoBack() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <IconButton
      bg="white"
      opacity={50}
      icon={<CaretLeft size={26} color={colors.gray[1]} />}
      onPress={handleGoBack}
    />
  );
}
