import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

export default function AddMoneyPlaceholder() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.navigate("index" as never);
  }, [navigation]);

  return <View />;
}
