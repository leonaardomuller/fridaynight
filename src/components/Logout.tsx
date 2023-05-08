import { Button, IButtonProps, Text } from "native-base";
import auth from "@react-native-firebase/auth";
interface Props extends IButtonProps {
  title: string;
}
export function Logout({ title }: Props) {
  return (
    <Button variant="outline">
      <Text>{title}</Text>
    </Button>
  );
}
