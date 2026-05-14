import React, { useState } from "react";
import {
  Platform,
  ScrollView,
  Text as RNText,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import * as Clipboard from "expo-clipboard";
import { useRouter } from "expo-router";

import { useFeedback } from "@/hooks";
import { Icon } from "@/icons";
import { useAuth } from "@/providers/AuthProvider";
import { fontFamily, fontSize, fontWeight, palette, spacing } from "@/theme";
import { ProfileButton } from "@/components/buttons";

const MAIN_PADDING_H = Platform.select({
  ios: spacing[4],
  android: spacing[2],
}) as number;

export default function ProfileScreen() {
  const router = useRouter();
  const feedback = useFeedback();
  const { logout } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [biometrics, setBiometrics] = useState(false);
  const name = "Maria Lafourcade";
  const username = "marialafourcade";
  const initial = name.charAt(0).toUpperCase();

  return (
    <View style={styles.parent}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <View style={styles.inner}>
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <RNText style={styles.avatarInitial}>{initial}</RNText>
          </View>
          <View style={styles.container}>
            <RNText style={styles.name}>{name}</RNText>
            <TouchableOpacity
              style={styles.usernameRow}
              onPress={async () => {
                const value = `@${username}`;
                await Clipboard.setStringAsync(value);
                const display =
                  value.length > 28 ? value.slice(0, 25) + "..." : value;
                feedback.success({ title: `${display} copied`, haptic: true });
              }}
              activeOpacity={0.7}
            >
              <RNText style={styles.username}>@{username}</RNText>
              <Icon
                name="copy"
                color={palette.gray[100]}
                width={16}
                height={16}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttonsSection}>
          <ProfileButton
            icon="user"
            label="Información personal"
            onPress={() => feedback.info({ title: "Información personal" })}
          />
          <ProfileButton
            icon="help"
            label="Centro de ayuda"
            onPress={() => feedback.info({ title: "Centro de ayuda" })}
          />
          <ProfileButton
            icon="logo"
            label="Configuración de fIPE"
            onPress={() => feedback.info({ title: "Configuración de fIPE" })}
          />
          <ProfileButton
            icon="notification"
            label="Permitir notificaciones"
            switchProps={{ value: notifications, onValueChange: setNotifications }}
          />
          <ProfileButton
            icon="security"
            label="Segurity"
            onPress={() => feedback.info({ title: "Segurity" })}
          />
          <ProfileButton
            icon="logout"
            label="Cerrar sesión"
            destructive
            onPress={() => logout()}
          />
        </View>
      </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    paddingHorizontal: MAIN_PADDING_H,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  inner: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
    alignSelf: "stretch",
  },
  profileSection: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    alignSelf: "stretch",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: palette.white,
    backgroundColor: palette.blue[500],
    alignItems: "center",
    justifyContent: "center",
  },
  avatarInitial: {
    color: palette.white,
    fontFamily: fontFamily.display,
    fontSize: 40,
    fontWeight: fontWeight.h1,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  name: {
    color: palette.gray[100],
    fontFamily: fontFamily.display,
    fontSize: fontSize.sectionTitle,
    fontWeight: fontWeight.pageTitle,
  },
  usernameRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  username: {
    color: palette.gray[100],
    fontFamily: fontFamily.display,
    fontSize: fontSize.captionLarge,
    fontWeight: fontWeight.captionLarge,
  },
  buttonsSection: {
    alignSelf: "stretch",
    borderRadius: 16,
    overflow: "hidden",
    borderTopWidth: 1,
    borderTopColor: palette.gray[800],
    marginTop: 28,
  },
});
