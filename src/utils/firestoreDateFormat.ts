import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export function dateFormat(timestamp: FirebaseFirestoreTypes.Timestamp) {
  if (timestamp) {
    const date = new Date(timestamp.toDate());

    const day = date.toLocaleDateString("pt-BR");
    const month = date.getMonth();
    const hour = date.toLocaleTimeString("pt-BR");
    return `${day} ${month} - ${hour}h`;
  }
}
