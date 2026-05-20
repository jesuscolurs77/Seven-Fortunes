import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

import { Button, Text } from "@/components";
import { Icon } from "@/icons";
import { fontFamily, palette } from "@/theme";

export default function WorkInProgressScreen() {
  const router = useRouter();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(tabs)");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.circle}>
          <Icon name="clock" width={32} height={32} color={palette.white} />
        </View>

        <View style={styles.textBlock}>
          <Text style={styles.title}>Estamos trabajando en esta vista</Text>
          <Text variant="body" style={styles.subtitle}>
            Pronto estará disponible. Gracias por tu paciencia.
          </Text>
        </View>
      </View>

      <View style={styles.bottomSection}>
        <Button variant="primary" size="lg" onPress={handleBack}>
          Entendido
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    gap: 32,
  },
  circle: {
    width: 72,
    height: 72,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 36,
    backgroundColor: palette.blue[700],
  },
  textBlock: {
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    alignSelf: "stretch",
  },
  title: {
    alignSelf: "stretch",
    textAlign: "center",
    color: palette.white,
    fontFamily: fontFamily.displaySemiBold,
    fontSize: 24,
    lineHeight: 32,
  },
  subtitle: {
    alignSelf: "stretch",
    textAlign: "center",
    color: palette.gray[200],
  },
  bottomSection: {
    flexDirection: "column",
    alignSelf: "stretch",
    paddingHorizontal: 16,
    paddingBottom: 42,
  },
});
