import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { Button } from "@/components/buttons";
import { Input, PasswordInput } from "@/components/inputs";
import { Text } from "@/components/typography";
import { useFeedback } from "@/hooks";
import { Icon } from "@/icons";
import { useAuth } from "@/providers/AuthProvider";
import { fontFamily, palette, semantic } from "@/theme";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginScreen() {
  const router = useRouter();
  const feedback = useFeedback();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validate = (): boolean => {
    let valid = true;

    if (!email.trim()) {
      setEmailError("Email is required");
      valid = false;
    } else if (!EMAIL_REGEX.test(email.trim())) {
      setEmailError("Enter a valid email address");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      valid = false;
    } else {
      setPasswordError("");
    }

    return valid;
  };

  const handleLogin = async () => {
    Keyboard.dismiss();
    if (!validate()) return;

    try {
      await login(email.trim(), password);
      feedback.success({ title: "Welcome back!" });
    } catch {
      feedback.error({ title: "Login failed" });
    }
  };

  return (
    <Pressable style={styles.container} onPress={Keyboard.dismiss}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.innerContainer}>
          <View style={styles.mainContent}>
            <Icon name="logo" width={32} height={32} />

            <Text style={styles.title}>Use your email to sign in</Text>

            <View style={styles.inputsContainer}>
              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Email address</Text>
                <Input
                  placeholder="Enter your email address"
                  value={email}
                  onChangeText={(v) => { setEmail(v); if (emailError) setEmailError(""); }}
                  hasError={!!emailError}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                {emailError ? (
                  <Text style={styles.errorText}>{emailError}</Text>
                ) : null}
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Password</Text>
                <PasswordInput
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={(v) => { setPassword(v); if (passwordError) setPasswordError(""); }}
                  hasError={!!passwordError}
                  style={{ fontFamily: fontFamily.body, fontWeight: "500" }}
                />
                {passwordError ? (
                  <Text style={styles.errorText}>{passwordError}</Text>
                ) : null}
                <TouchableOpacity onPress={() => {}} activeOpacity={0.7}>
                  <Text style={styles.resetLink}>Reset Password</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Button variant="primary" size="lg" onPress={handleLogin}>
              Log In
            </Button>
          </View>

          <View style={styles.loginRow}>
            <Text style={styles.loginPrompt}>{`Don't have an account?`}</Text>
            <TouchableOpacity
              onPress={() => router.push("/(noAuth)/signup")}
              activeOpacity={0.7}
            >
              <Text style={styles.loginLink}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: semantic.background.primary,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingVertical: 42,
    flexGrow: 1,
    justifyContent: "center",
  },
  innerContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 60,
    alignSelf: "stretch",
  },
  mainContent: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 32,
    alignSelf: "stretch",
  },
  title: {
    alignSelf: "stretch",
    color: palette.white,
    fontFamily: fontFamily.displaySemiBold,
    fontSize: 28,
    lineHeight: 36,
  },
  inputsContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 16,
    alignSelf: "stretch",
  },
  fieldGroup: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 8,
    alignSelf: "stretch",
  },
  label: {
    color: palette.gray[200],
    fontFamily: fontFamily.body,
    fontWeight: "500",
    fontSize: 16,
    includeFontPadding: false,
  },
  errorText: {
    color: semantic.error.default,
    fontFamily: fontFamily.body,
    fontWeight: "400",
    fontSize: 12,
    includeFontPadding: false,
  },
  resetLink: {
    color: palette.blue[300],
    fontFamily: fontFamily.displaySemiBold,
    fontSize: 14,
    textDecorationLine: "underline",
    includeFontPadding: false,
  },
  loginRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    gap: 4,
  },
  loginPrompt: {
    color: palette.gray[200],
    fontFamily: fontFamily.body,
    fontWeight: "500",
    fontSize: 14,
    includeFontPadding: false,
  },
  loginLink: {
    color: palette.blue[300],
    fontFamily: fontFamily.displaySemiBold,
    fontSize: 14,
    textDecorationLine: "underline",
    includeFontPadding: false,
  },
});
