import { Alert } from "react-native";

export async function copyToClipboard(text: string) {
  try {
    const { Clipboard } = require("react-native");
    if (Clipboard?.setString) {
      Clipboard.setString(text);
      Alert.alert("Copied", "Text copied to clipboard");
    }
  } catch {
    Alert.alert("Copied", text);
  }
}
