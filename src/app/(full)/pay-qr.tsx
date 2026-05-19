import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Text as RNText,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { Button } from "@/components";
import { fontFamily, palette, spacing } from "@/theme";

const SCAN_FRAME_HEIGHT = 370;
const SCAN_FRAME_BORDER_COLOR = "#419b39";
const COUNTDOWN_SECONDS = 3 * 60 + 22;

function formatCountdown(totalSeconds: number) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export default function PayQrScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_SECONDS);
  const scannedRef = useRef(false);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const id = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [secondsLeft]);

  const handleScan = (data: string) => {
    if (scannedRef.current) return;
    scannedRef.current = true;
    router.replace({
      pathname: "/(full)/funds-processing",
      params: {
        type: "qr",
        id: data || "qr-scan",
        name: "Tienda Plaza Vea Norte",
        amount: "120",
      },
    });
  };

  if (!permission) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator color={palette.white} />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={[styles.container, styles.permissionContainer]}>
        <View style={styles.permissionTexts}>
          <RNText style={styles.instructionTitle}>
            Necesitamos acceso a la cámara
          </RNText>
          <RNText style={styles.instructionSubtitle}>
            Para escanear el código QR de pago, permite el uso de la cámara.
          </RNText>
        </View>
        <Button variant="primary" size="lg" onPress={requestPermission}>
          Permitir cámara
        </Button>
      </View>
    );
  }

  const expired = secondsLeft <= 0;

  return (
    <View style={styles.container}>
      <View style={styles.scanFrame}>
        <CameraView
          style={StyleSheet.absoluteFill}
          facing="back"
          barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
          onBarcodeScanned={
            expired ? undefined : ({ data }) => handleScan(data)
          }
        />
      </View>

      <View style={styles.expiryPill}>
        <RNText style={styles.expiryText}>
          {expired ? "Código expirado" : `Expira en ${formatCountdown(secondsLeft)}`}
        </RNText>
      </View>

      <View style={styles.instructions}>
        <RNText style={styles.instructionTitle}>
          Mantén el código QR dentro del recuadro
        </RNText>
        <RNText style={styles.instructionSubtitle}>
          No cierres la app después de realizar el pago
        </RNText>
      </View>

      {expired && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            scannedRef.current = false;
            setSecondsLeft(COUNTDOWN_SECONDS);
          }}
          style={styles.retryButton}
        >
          <RNText style={styles.retryText}>Volver a intentar</RNText>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[8],
    gap: spacing[3],
    alignItems: "center",
  },
  centered: {
    justifyContent: "center",
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    gap: spacing[6],
  },
  permissionTexts: {
    alignItems: "center",
    gap: spacing[2],
    paddingHorizontal: spacing[4],
  },
  scanFrame: {
    width: "100%",
    height: SCAN_FRAME_HEIGHT,
    borderWidth: 4,
    borderColor: SCAN_FRAME_BORDER_COLOR,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: palette.gray[900],
  },
  expiryPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 99,
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  expiryText: {
    color: palette.white,
    fontFamily: fontFamily.display,
    fontSize: 14,
    includeFontPadding: false,
  },
  instructions: {
    width: "100%",
    padding: 16,
    borderRadius: 12,
    gap: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  instructionTitle: {
    color: palette.white,
    fontFamily: fontFamily.display,
    fontSize: 16,
    textAlign: "center",
    includeFontPadding: false,
  },
  instructionSubtitle: {
    color: palette.gray[200],
    fontFamily: fontFamily.display,
    fontSize: 13,
    textAlign: "center",
    includeFontPadding: false,
  },
  retryButton: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
  },
  retryText: {
    color: palette.blue[400],
    fontFamily: fontFamily.displaySemiBold,
    fontSize: 16,
  },
});
