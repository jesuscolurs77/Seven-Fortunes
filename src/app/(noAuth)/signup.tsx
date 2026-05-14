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
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "@/components/buttons";
import { Input } from "@/components/inputs";
import { Select } from "@/components/selects";
import { Text } from "@/components/typography";
import { fontFamily, palette, semantic } from "@/theme";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\d{7,15}$/;

const US_STATES = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

const COUNTRY_CODES = [
  { value: "+1", label: "+1" },
  { value: "+51", label: "+51" },
  { value: "+52", label: "+52" },
  { value: "+57", label: "+57" },
  { value: "+54", label: "+54" },
  { value: "+56", label: "+56" },
  { value: "+593", label: "+593" },
  { value: "+34", label: "+34" },
];

export default function SignupScreen() {
  const router = useRouter();

  const [countryCode, setCountryCode] = useState("+1");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [stateError, setStateError] = useState("");

  const validate = (): boolean => {
    let valid = true;

    const digits = phone.replace(/\D/g, "");
    if (!phone.trim()) {
      setPhoneError("Phone number is required");
      valid = false;
    } else if (!PHONE_REGEX.test(digits)) {
      setPhoneError("Enter a valid phone number");
      valid = false;
    } else {
      setPhoneError("");
    }

    if (!name.trim()) {
      setNameError("Full name is required");
      valid = false;
    } else if (name.trim().length < 2) {
      setNameError("Name must be at least 2 characters");
      valid = false;
    } else {
      setNameError("");
    }

    if (!email.trim()) {
      setEmailError("Email is required");
      valid = false;
    } else if (!EMAIL_REGEX.test(email.trim())) {
      setEmailError("Enter a valid email address");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!state) {
      setStateError("Please select a state");
      valid = false;
    } else {
      setStateError("");
    }

    return valid;
  };

  const handleContinue = () => {
    Keyboard.dismiss();
    if (!validate()) return;
    router.replace("/(noAuth)/verify-account");
  };

  const stateOptions = US_STATES.map((s) => ({ value: s, label: s }));

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <Pressable style={styles.outerContainer} onPress={Keyboard.dismiss}>
        <View style={styles.topSection}>
          <Text style={styles.title}>Create your account</Text>
          <Text style={styles.subtitle}>
            {`Enter your phone number to get started, We'll send a verification code.`}
          </Text>
        </View>

        <ScrollView
          style={styles.bottomScroll}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.inputsColumn}>
            <View style={styles.fieldGroup}>
              <Text style={[styles.label, styles.firstLabel]}>
                Phone number
              </Text>
              <View style={styles.phoneRow}>
                <View style={styles.countryCodeWrapper}>
                  <Select
                    placeholder="+1"
                    options={COUNTRY_CODES}
                    value={countryCode}
                    onChange={(value) => setCountryCode(value)}
                    modalTitle="Select country code"
                    showSearch={false}
                  />
                </View>
                <Input
                  placeholder="Phone number"
                  value={phone}
                  onChangeText={(v) => { setPhone(v); if (phoneError) setPhoneError(""); }}
                  keyboardType="phone-pad"
                  hasError={!!phoneError}
                  style={styles.phoneInput}
                />
              </View>
              {phoneError ? (
                <Text style={styles.errorText}>{phoneError}</Text>
              ) : null}
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Full name</Text>
              <Input
                placeholder="Enter your full name"
                value={name}
                onChangeText={(v) => { setName(v); if (nameError) setNameError(""); }}
                hasError={!!nameError}
                autoCapitalize="words"
              />
              {nameError ? (
                <Text style={styles.errorText}>{nameError}</Text>
              ) : null}
            </View>

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
              <Text style={styles.label}>State</Text>
              <Select
                placeholder="Select your state"
                options={stateOptions}
                value={state}
                onChange={(v) => { setState(v); if (stateError) setStateError(""); }}
                hasError={!!stateError}
                modalTitle="Select your state"
                showSearch
                searchPlaceholder="Search states..."
              />
              {stateError ? (
                <Text style={styles.errorText}>{stateError}</Text>
              ) : null}
            </View>
          </View>

          <View style={styles.actionsColumn}>
            <Button variant="primary" size="lg" onPress={handleContinue}>
              Continue
            </Button>

            <View style={styles.loginRow}>
              <Text style={styles.loginPrompt}>{`Don't have an account?`}</Text>
              <TouchableOpacity
                onPress={() => router.push("/(noAuth)/login")}
                activeOpacity={0.7}
              >
                <Text style={styles.loginLink}>Sign in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: semantic.background.primary,
  },
  outerContainer: {
    flexGrow: 1,
    flexShrink: 0,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 42,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    alignSelf: "stretch",
  },
  topSection: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 8,
    alignSelf: "stretch",
  },
  title: {
    alignSelf: "stretch",
    color: palette.white,
    fontFamily: fontFamily.displaySemiBold,
    fontSize: 28,
    lineHeight: 36,
  },
  subtitle: {
    alignSelf: "stretch",
    color: palette.gray[200],
    fontFamily: fontFamily.displayMedium,
    fontSize: 16,
    lineHeight: 22,
  },
  bottomScroll: {
    flex: 1,
    alignSelf: "stretch",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  inputsColumn: {
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
  phoneRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    alignSelf: "stretch",
  },
  countryCodeWrapper: {
    width: 100,
  },
  phoneInput: {
    flex: 1,
  },
  label: {
    color: palette.gray[200],
    fontFamily: fontFamily.displayMedium,
    fontSize: 16,
  },
  firstLabel: {
    marginTop: 32,
  },
  errorText: {
    color: semantic.error.default,
    fontFamily: fontFamily.body,
    fontWeight: "400",
    fontSize: 12,
  },
  actionsColumn: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 32,
    alignSelf: "stretch",
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
  },
  loginLink: {
    color: palette.blue[300],
    fontFamily: fontFamily.displaySemiBold,
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
