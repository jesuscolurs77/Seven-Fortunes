import React from "react";
import {
  Image,
  Platform,
  Text as RNText,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import {
  BankSelect,
  Button,
  Card,
  CurrencyInput,
  DEFAULT_BANKS,
  GlassButton,
  GlassCard,
  GlassModal,
  HorizontalScroll,
  IconButton,
  Input,
  PasswordInput,
  Screen,
  Select,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Switch,
  Text,
  type HorizontalScrollItem,
  type SelectOption,
} from "@/components";
import { palette, radius, semantic, spacing } from "@/theme";

let GlassViewDirect: any = null;
let isGlassEffectAPIAvailableFn: (() => boolean) | null = null;
let isLiquidGlassAvailableFn: (() => boolean) | null = null;

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const expoGlassEffect = require("expo-glass-effect");
  GlassViewDirect = expoGlassEffect.GlassView || null;
  isGlassEffectAPIAvailableFn =
    expoGlassEffect.isGlassEffectAPIAvailable || null;
  isLiquidGlassAvailableFn = expoGlassEffect.isLiquidGlassAvailable || null;
} catch {
  GlassViewDirect = null;
}

function checkIsLiquidGlassAvailable(): boolean {
  if (!isLiquidGlassAvailableFn) return false;
  try {
    return isLiquidGlassAvailableFn();
  } catch {
    return false;
  }
}

function checkIsGlassEffectAPIAvailable(): boolean {
  if (!isGlassEffectAPIAvailableFn) return false;
  try {
    return isGlassEffectAPIAvailableFn();
  } catch {
    return false;
  }
}

function checkIsGlassEffectAvailable(): boolean {
  if (Platform.OS !== "ios") return false;
  if (!GlassViewDirect) return false;
  try {
    const runtime = checkIsGlassEffectAPIAvailable();
    const compile = checkIsLiquidGlassAvailable();
    return runtime && compile;
  } catch {
    return false;
  }
}

const COUNTRY_OPTIONS: SelectOption[] = [
  {
    value: "us",
    label: "Estados Unidos",
    subtitle: "+1",
    icon: <RNText style={{ fontSize: 20 }}>🇺🇸</RNText>,
  },
  {
    value: "mx",
    label: "México",
    subtitle: "+52",
    icon: <RNText style={{ fontSize: 20 }}>🇲🇽</RNText>,
  },
  {
    value: "co",
    label: "Colombia",
    subtitle: "+57",
    icon: <RNText style={{ fontSize: 20 }}>🇨🇴</RNText>,
  },
  {
    value: "br",
    label: "Brasil",
    subtitle: "+55",
    icon: <RNText style={{ fontSize: 20 }}>🇧🇷</RNText>,
  },
  {
    value: "ar",
    label: "Argentina",
    subtitle: "+54",
    icon: <RNText style={{ fontSize: 20 }}>🇦🇷</RNText>,
  },
  {
    value: "cl",
    label: "Chile",
    subtitle: "+56",
    icon: <RNText style={{ fontSize: 20 }}>🇨🇱</RNText>,
  },
  {
    value: "pe",
    label: "Perú",
    subtitle: "+51",
    icon: <RNText style={{ fontSize: 20 }}>🇵🇪</RNText>,
  },
  {
    value: "ec",
    label: "Ecuador",
    subtitle: "+593",
    icon: <RNText style={{ fontSize: 20 }}>🇪🇨</RNText>,
  },
  {
    value: "es",
    label: "España",
    subtitle: "+34",
    icon: <RNText style={{ fontSize: 20 }}>🇪🇸</RNText>,
  },
  {
    value: "gb",
    label: "Reino Unido",
    subtitle: "+44",
    icon: <RNText style={{ fontSize: 20 }}>🇬🇧</RNText>,
  },
  {
    value: "de",
    label: "Alemania",
    subtitle: "+49",
    icon: <RNText style={{ fontSize: 20 }}>🇩🇪</RNText>,
  },
  {
    value: "fr",
    label: "Francia",
    subtitle: "+33",
    icon: <RNText style={{ fontSize: 20 }}>🇫🇷</RNText>,
  },
];

const BANK_OPTIONS: SelectOption[] = [
  {
    value: "bbva",
    label: "BBVA",
    icon: <RNText style={{ fontSize: 20 }}>🏦</RNText>,
  },
  {
    value: "santander",
    label: "Santander",
    icon: <RNText style={{ fontSize: 20 }}>💰</RNText>,
  },
  {
    value: "citibanamex",
    label: "Citibanamex",
    icon: <RNText style={{ fontSize: 20 }}>💳</RNText>,
  },
  {
    value: "scotiabank",
    label: "Scotiabank",
    icon: <RNText style={{ fontSize: 20 }}>🏧</RNText>,
  },
  {
    value: "hsbc",
    label: "HSBC",
    icon: <RNText style={{ fontSize: 20 }}>💵</RNText>,
  },
  {
    value: "banorte",
    label: "Banorte",
    icon: <RNText style={{ fontSize: 20 }}>🏛️</RNText>,
  },
  {
    value: "bancolombia",
    label: "Bancolombia",
    icon: <RNText style={{ fontSize: 20 }}>🏦</RNText>,
  },
  {
    value: "itau",
    label: "Itaú",
    icon: <RNText style={{ fontSize: 20 }}>💰</RNText>,
  },
];

const CRYPTO_OPTIONS: SelectOption[] = [
  {
    value: "btc",
    label: "Bitcoin",
    subtitle: "BTC",
    icon: <RNText style={{ fontSize: 20 }}>₿</RNText>,
  },
  {
    value: "eth",
    label: "Ethereum",
    subtitle: "ETH",
    icon: <RNText style={{ fontSize: 20 }}>Ξ</RNText>,
  },
  {
    value: "usdt",
    label: "Tether",
    subtitle: "USDT",
    icon: <RNText style={{ fontSize: 20 }}>💲</RNText>,
  },
  {
    value: "usdc",
    label: "USD Coin",
    subtitle: "USDC",
    icon: <RNText style={{ fontSize: 20 }}>💵</RNText>,
  },
  {
    value: "bnb",
    label: "BNB",
    subtitle: "BNB",
    icon: <RNText style={{ fontSize: 20 }}>🪙</RNText>,
  },
  {
    value: "sol",
    label: "Solana",
    subtitle: "SOL",
    icon: <RNText style={{ fontSize: 20 }}>☀️</RNText>,
  },
  {
    value: "ada",
    label: "Cardano",
    subtitle: "ADA",
    icon: <RNText style={{ fontSize: 20 }}>💎</RNText>,
  },
  {
    value: "doge",
    label: "Dogecoin",
    subtitle: "DOGE",
    icon: <RNText style={{ fontSize: 20 }}>🐕</RNText>,
  },
];

const HORIZONTAL_ITEMS: HorizontalScrollItem[] = [
  {
    id: "send",
    label: "Enviar",
    icon: <RNText style={{ fontSize: 24 }}>📤</RNText>,
    badge: 3,
  },
  {
    id: "receive",
    label: "Recibir",
    icon: <RNText style={{ fontSize: 24 }}>📥</RNText>,
  },
  {
    id: "swap",
    label: "Cambiar",
    icon: <RNText style={{ fontSize: 24 }}>🔄</RNText>,
  },
  {
    id: "buy",
    label: "Comprar",
    icon: <RNText style={{ fontSize: 24 }}>🛒</RNText>,
    badge: "Nuevo",
  },
  {
    id: "sell",
    label: "Vender",
    icon: <RNText style={{ fontSize: 24 }}>💰</RNText>,
  },
  {
    id: "history",
    label: "Historial",
    icon: <RNText style={{ fontSize: 24 }}>📋</RNText>,
  },
];

const INFINITE_LIST_ITEMS = Array.from({ length: 20 }, (_, i) => ({
  id: `item-${i + 1}`,
  title: `Elemento ${i + 1}`,
  subtitle: `Descripción del elemento ${i + 1}`,
  amount: (Math.random() * 1000).toFixed(2),
}));

export default function ComponentsScreen() {
  const [switchValue, setSwitchValue] = React.useState(true);
  const [switchValue2, setSwitchValue2] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);

  const [selectedCountry, setSelectedCountry] = React.useState<string>("");
  const [selectedBank, setSelectedBank] = React.useState<string>("");
  const [selectedCrypto, setSelectedCrypto] = React.useState<string>("");
  const [selectedDisabled, setSelectedDisabled] = React.useState<string>("mx");

  const [currencyValue, setCurrencyValue] = React.useState<number>(0);
  const [selectedHorizontalItem, setSelectedHorizontalItem] =
    React.useState<string>("send");

  const [apiStatus, setApiStatus] = React.useState({
    isGlassEffectAvailable: false,
    isLiquidGlassAvailable: false,
    isGlassEffectAPIAvailable: false,
    GlassViewLoaded: !!GlassViewDirect,
  });

  React.useEffect(() => {
    setApiStatus({
      isGlassEffectAvailable: checkIsGlassEffectAvailable(),
      isLiquidGlassAvailable: checkIsLiquidGlassAvailable(),
      isGlassEffectAPIAvailable: checkIsGlassEffectAPIAvailable(),
      GlassViewLoaded: !!GlassViewDirect,
    });
  }, []);

  const StatusDot = ({ available }: { available: boolean }) => (
    <View
      style={[
        styles.statusDot,
        { backgroundColor: available ? "#34C759" : "#FF453A" },
      ]}
    />
  );

  return (
    <Screen>
      <ScrollView
        contentContainerStyle={{ paddingVertical: spacing[8] }}
        keyboardShouldPersistTaps="handled"
      >
        {/* ============================================
             API STATUS DIAGNOSTIC - MUY IMPORTANTE
            ============================================ */}
        <Card variant="outlined" className="mb-6">
          <Card.Content>
            <Text variant="h3" className="mb-4">
              Glass Effect API Status
            </Text>
            <Text variant="bodySmall" color="muted" className="mb-4">
              Estos valores determinan si GlassView funciona
            </Text>

            <View style={styles.statusRow}>
              <StatusDot available={apiStatus.GlassViewLoaded} />
              <View style={styles.statusTextContainer}>
                <Text variant="body">GlassView import:</Text>
                <Text variant="mono">
                  {apiStatus.GlassViewLoaded ? "OK - cargado" : "FALLÓ"}
                </Text>
              </View>
            </View>

            <View style={styles.statusRow}>
              <StatusDot available={apiStatus.isLiquidGlassAvailable} />
              <View style={styles.statusTextContainer}>
                <Text variant="body">isLiquidGlassAvailable:</Text>
                <Text variant="mono">
                  {apiStatus.isLiquidGlassAvailable ? "YES" : "NO"}
                </Text>
                <Text variant="caption" color="muted">
                  Chequea Info.plist/compilación
                </Text>
              </View>
            </View>

            <View style={styles.statusRow}>
              <StatusDot available={apiStatus.isGlassEffectAPIAvailable} />
              <View style={styles.statusTextContainer}>
                <Text variant="body">isGlassEffectAPIAvailable:</Text>
                <Text variant="mono">
                  {apiStatus.isGlassEffectAPIAvailable ? "YES" : "NO"}
                </Text>
                <Text variant="caption" color="muted">
                  Chequea API runtime (iOS 26+ betas)
                </Text>
              </View>
            </View>

            <View style={styles.statusRow}>
              <StatusDot available={apiStatus.isGlassEffectAvailable} />
              <View style={styles.statusTextContainer}>
                <Text variant="body">isGlassEffectAvailable (combinado):</Text>
                <Text variant="mono">
                  {apiStatus.isGlassEffectAvailable ? "YES" : "NO"}
                </Text>
                <Text variant="caption" color="muted">
                  = isLiquidGlassAvailable AND isGlassEffectAPIAvailable
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* ============================================
             DIRECT GLASSVIEW TEST - Siguiendo docs EXACTAMENTE
            ============================================ */}
        <Card variant="outlined" className="mb-6">
          <Card.Content>
            <Text variant="h3" className="mb-4">
              Direct GlassView Test
            </Text>
            <Text variant="bodySmall" color="muted" className="mb-4">
              Siguiendo el patrón EXACTO de la documentación de Expo
            </Text>

            <View style={styles.glassTestContainer}>
              <View style={styles.glassTestBackground}>
                <Image
                  style={styles.glassTestImage}
                  source={{
                    uri: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
                  }}
                />

                {apiStatus.isGlassEffectAvailable && GlassViewDirect ? (
                  <GlassViewDirect
                    style={styles.glassTestGlass}
                    glassEffectStyle="regular"
                    colorScheme="dark"
                  />
                ) : (
                  <View
                    style={[styles.glassTestGlass, styles.glassTestFallback]}
                  />
                )}

                <View style={styles.glassTestLabel}>
                  <Text variant="mono" style={{ color: "#FFFFFF" }}>
                    {apiStatus.isGlassEffectAvailable && GlassViewDirect
                      ? "GlassView NATIVO"
                      : "Fallback visible"}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.specRow}>
              <Text variant="mono" color="muted">
                glassEffectStyle:
              </Text>
              <Text variant="mono">regular</Text>
            </View>
            <View style={styles.specRow}>
              <Text variant="mono" color="muted">
                colorScheme:
              </Text>
              <Text variant="mono">dark</Text>
            </View>
            <View style={styles.specRow}>
              <Text variant="mono" color="muted">
                position:
              </Text>
              <Text variant="mono">absolute, con imagen detrás</Text>
            </View>
          </Card.Content>
        </Card>

        {/* ============================================
              ENHANCED GLASS DEMO - Nuestros componentes con fondo colorido
             ============================================ */}
        <Card variant="outlined" className="mb-6">
          <Card.Content>
            <Text variant="h3" className="mb-2">
              Enhanced Glass Demo
            </Text>
            <Text variant="bodySmall" color="muted" className="mb-6">
              Nuestros GlassCard y GlassButton SOBRE fondo colorido (como el
              test que funciona)
            </Text>

            <View style={styles.enhancedGlassContainer}>
              <View style={styles.enhancedGlassBackground}>
                <Image
                  style={styles.enhancedGlassImage}
                  source={{
                    uri: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=500&fit=crop",
                  }}
                />

                <View style={styles.enhancedGlassOverlay}>
                  {apiStatus.isGlassEffectAvailable && GlassViewDirect ? (
                    <GlassViewDirect
                      style={styles.enhancedGlassCardBg}
                      glassEffectStyle="regular"
                      colorScheme="dark"
                      isInteractive={true}
                    />
                  ) : (
                    <View
                      style={[
                        styles.enhancedGlassCardBg,
                        styles.glassTestFallback,
                      ]}
                    />
                  )}

                  <View style={styles.enhancedGlassContent}>
                    <Text
                      variant="h4"
                      style={{ color: "#FFFFFF", marginBottom: spacing[2] }}
                    >
                      Glass Card with Content
                    </Text>
                    <Text
                      variant="body"
                      style={{
                        color: "rgba(255,255,255,0.9)",
                        marginBottom: spacing[2],
                      }}
                    >
                      Esto es lo que verás cuando una GlassCard esté SOBRE
                      contenido colorido.
                    </Text>
                    <Text
                      variant="caption"
                      color="muted"
                      style={{ marginBottom: spacing[4] }}
                    >
                      isInteractive={true} + fondo colorido = efecto nativo
                      espectacular
                    </Text>
                    <View style={styles.enhancedGlassButtons}>
                      {apiStatus.isGlassEffectAvailable && GlassViewDirect ? (
                        <>
                          <View style={styles.enhancedGlassButtonWrapper}>
                            <GlassViewDirect
                              style={StyleSheet.absoluteFill}
                              glassEffectStyle="regular"
                              colorScheme="dark"
                              isInteractive={true}
                            />
                            <View style={styles.glassButtonContent}>
                              <RNText
                                style={{
                                  color: "#FFFFFF",
                                  fontSize: 14,
                                  fontWeight: "600",
                                }}
                              >
                                ✨ Glass
                              </RNText>
                            </View>
                          </View>
                          <View style={styles.enhancedGlassButtonWrapper}>
                            <GlassViewDirect
                              style={StyleSheet.absoluteFill}
                              glassEffectStyle="regular"
                              colorScheme="dark"
                              isInteractive={true}
                            />
                            <View style={styles.glassButtonContent}>
                              <RNText
                                style={{
                                  color: "#FFFFFF",
                                  fontSize: 14,
                                  fontWeight: "600",
                                }}
                              >
                                🚀 Effect
                              </RNText>
                            </View>
                          </View>
                        </>
                      ) : (
                        <>
                          <GlassButton
                            icon={
                              <RNText
                                style={{
                                  fontSize: 16,
                                  fontWeight: "600",
                                  color: "white",
                                }}
                              >
                                ✨
                              </RNText>
                            }
                            label="Fallback"
                          />
                          <GlassButton
                            icon={
                              <RNText
                                style={{
                                  fontSize: 16,
                                  fontWeight: "600",
                                  color: "white",
                                }}
                              >
                                🎯
                              </RNText>
                            }
                            label="Corners"
                          />
                        </>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.specRow}>
              <Text variant="bodySmall" color="secondary">
                isInteractive:
              </Text>
              <Text variant="mono">
                true - Habilita interacción nativa y movimiento
              </Text>
            </View>
            <View style={styles.specRow}>
              <Text variant="bodySmall" color="secondary">
                Tip:
              </Text>
              <Text variant="mono">
                Usa GlassContainer para que múltiples botones interactúen entre
                sí
              </Text>
            </View>
            <View style={styles.specRow}>
              <Text variant="bodySmall" color="secondary">
                Importante:
              </Text>
              <Text variant="mono">
                Glass effect = BLUR. Necesita contenido colorido detrás para
                notarse.
              </Text>
            </View>
          </Card.Content>
        </Card>

        <View className="items-center mb-10">
          <Text variant="display">Design System</Text>
          <Text variant="body" color="muted" className="mt-2">
            Seven Fortunes - Expo SDK 55
          </Text>
        </View>

        <Card variant="outlined" className="mb-6">
          <Card.Content>
            <Text variant="h3" className="mb-6">
              Estados del Botón Primario
            </Text>

            <View style={styles.section}>
              <Text variant="bodySmall" color="secondary" className="mb-3">
                Default
              </Text>
              <Button
                variant="primary"
                onPress={() => console.log("Primary pressed")}
              >
                Ingresar
              </Button>
            </View>

            <View style={styles.section}>
              <Text variant="bodySmall" color="secondary" className="mb-3">
                Pressed (manten presionado para ver)
              </Text>
              <Button variant="primary" onPress={() => {}}>
                Botón Presionado
              </Button>
              <Text variant="caption" color="muted" className="mt-2">
                background: blue[600] = #274786
              </Text>
            </View>

            <View style={styles.section}>
              <Text variant="bodySmall" color="secondary" className="mb-3">
                Disabled
              </Text>
              <Button variant="primary" disabled onPress={() => {}}>
                Botón Desactivado
              </Button>
              <View className="flex-row gap-4 mt-2">
                <Text variant="caption" color="muted">
                  bg: blue[700] = #1C3360
                </Text>
                <Text variant="caption" color="muted">
                  text: blue[400] = #7493D3
                </Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text variant="bodySmall" color="secondary" className="mb-3">
                Loading
              </Text>
              <Button variant="primary" loading onPress={() => {}}>
                Loading...
              </Button>
            </View>
          </Card.Content>
        </Card>

        <Card variant="outlined">
          <Card.Content>
            <Text variant="h3" className="mb-4">
              Especificación
            </Text>

            <View style={styles.specRow}>
              <Text variant="bodySmall" color="secondary">
                Border radius:
              </Text>
              <Text variant="mono">8px (radius.sm)</Text>
            </View>

            <View style={styles.specRow}>
              <Text variant="bodySmall" color="secondary">
                Padding:
              </Text>
              <Text variant="mono">12px vertical, 16px horizontal</Text>
            </View>

            <View style={styles.specRow}>
              <Text variant="bodySmall" color="secondary">
                Gap:
              </Text>
              <Text variant="mono">12px</Text>
            </View>

            <View style={styles.specRow}>
              <Text variant="bodySmall" color="secondary">
                Typography:
              </Text>
              <Text variant="mono">display, 18px, 600 weight</Text>
            </View>

            <View style={styles.specRow}>
              <Text variant="bodySmall" color="secondary">
                Default bg:
              </Text>
              <View
                style={[
                  styles.colorDot,
                  { backgroundColor: semantic.brand.primary },
                ]}
              />
              <Text variant="mono">blue[500] = #3865C0</Text>
            </View>

            <View style={styles.specRow}>
              <Text variant="bodySmall" color="secondary">
                Disabled SIN opacity:
              </Text>
              <Text variant="mono" color="muted">
                colores explícitos, no opacity
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* ============================================
            BUTTON SECONDARY
           ============================================ */}
        <Card variant="outlined" className="mb-6">
          <Card.Content>
            <Text variant="h3" className="mb-6">
              Estados del Botón Secundario
            </Text>

            <View style={styles.section}>
              <Text variant="bodySmall" color="secondary" className="mb-3">
                Default
              </Text>
              <Button
                variant="secondary"
                onPress={() => console.log("Secondary pressed")}
              >
                Ingresar
              </Button>
            </View>

            <View style={styles.section}>
              <Text variant="bodySmall" color="secondary" className="mb-3">
                Pressed (manten presionado para ver)
              </Text>
              <Button variant="secondary" onPress={() => {}}>
                Botón Presionado
              </Button>
              <Text variant="caption" color="muted" className="mt-2">
                background: rgba(255,255,255,0.15)
              </Text>
            </View>

            <View style={styles.section}>
              <Text variant="bodySmall" color="secondary" className="mb-3">
                Disabled
              </Text>
              <Button variant="secondary" disabled onPress={() => {}}>
                Botón Desactivado
              </Button>
              <Text variant="caption" color="muted" className="mt-2">
                bg: rgba(255,255,255,0.05) | text: white 40% opacity
              </Text>
            </View>

            <View style={styles.section}>
              <Text variant="bodySmall" color="secondary" className="mb-3">
                Loading
              </Text>
              <Button variant="secondary" loading onPress={() => {}}>
                Loading...
              </Button>
            </View>
          </Card.Content>
        </Card>

        <Card variant="outlined">
          <Card.Content>
            <Text variant="h3" className="mb-4">
              Especificación Secondary
            </Text>

            <View style={styles.specRow}>
              <Text variant="bodySmall" color="secondary">
                Border radius:
              </Text>
              <Text variant="mono">4px (radius.xs)</Text>
            </View>

            <View style={styles.specRow}>
              <Text variant="bodySmall" color="secondary">
                Default bg:
              </Text>
              <Text variant="mono">rgba(255,255,255,0.10)</Text>
            </View>

            <View style={styles.specRow}>
              <Text variant="bodySmall" color="secondary">
                Pressed bg:
              </Text>
              <Text variant="mono">rgba(255,255,255,0.15)</Text>
            </View>

            <View style={styles.specRow}>
              <Text variant="bodySmall" color="secondary">
                Disabled bg:
              </Text>
              <Text variant="mono">rgba(255,255,255,0.05)</Text>
            </View>

            <View style={styles.specRow}>
              <Text variant="bodySmall" color="secondary">
                Text color (todos):
              </Text>
              <Text variant="mono">#FFFFFF</Text>
            </View>
          </Card.Content>
        </Card>

        {/* ============================================
            INPUT
           ============================================ */}
        <Card variant="outlined" className="mb-6">
          <Card.Content>
            <Text variant="h3" className="mb-6">
              Estados del Input
            </Text>

            <View style={styles.section}>
              <Text variant="bodySmall" color="secondary" className="mb-3">
                Default / Activo
              </Text>
              <Input
                placeholder="Escribe algo..."
                defaultValue="Texto de ejemplo"
              />
              <Text variant="caption" color="muted" className="mt-2">
                border: 1px rgba(255,255,255,0.50)
              </Text>
            </View>

            <View style={styles.section}>
              <Text variant="bodySmall" color="secondary" className="mb-3">
                Focused (toca para ver)
              </Text>
              <Input placeholder="Toca para enfocar..." />
              <Text variant="caption" color="muted" className="mt-2">
                border: 2px blue[500] = #3865C0
              </Text>
            </View>

            <View style={styles.section}>
              <Text variant="bodySmall" color="secondary" className="mb-3">
                Disabled
              </Text>
              <Input
                placeholder="Desactivado..."
                defaultValue="No editable"
                disabled
              />
              <View className="flex-row gap-4 mt-2">
                <Text variant="caption" color="muted">
                  border: rgba(255,255,255,0.15)
                </Text>
                <Text variant="caption" color="muted">
                  text: rgba(255,255,255,0.50)
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        <Card variant="outlined">
          <Card.Content>
            <Text variant="h3" className="mb-4">
              Especificación Input
            </Text>

            <View style={styles.specRow}>
              <Text variant="bodySmall" color="secondary">
                Height:
              </Text>
              <Text variant="mono">48px</Text>
            </View>

            <View style={styles.specRow}>
              <Text variant="bodySmall" color="secondary">
                Padding:
              </Text>
              <Text variant="mono">12px</Text>
            </View>

            <View style={styles.specRow}>
              <Text variant="bodySmall" color="secondary">
                Border radius:
              </Text>
              <Text variant="mono">8px (radius.sm)</Text>
            </View>

            <View style={styles.specRow}>
              <Text variant="bodySmall" color="secondary">
                Background (todos):
              </Text>
              <View
                style={[
                  styles.colorDot,
                  { backgroundColor: semantic.surface.primary },
                ]}
              />
              <Text variant="mono">gray[900] = #232530</Text>
            </View>

            <View style={styles.specRow}>
              <Text variant="bodySmall" color="secondary">
                Typography:
              </Text>
              <Text variant="mono">display, 16px, 500 weight</Text>
            </View>

            <View style={styles.specRow}>
              <Text variant="bodySmall" color="secondary">
                Default border:
              </Text>
              <Text variant="mono">1px, rgba(255,255,255,0.50)</Text>
            </View>

            <View style={styles.specRow}>
              <Text variant="bodySmall" color="secondary">
                Focused border:
              </Text>
              <Text variant="mono">2px, blue[500] = #3865C0</Text>
            </View>

            <View style={styles.specRow}>
              <Text variant="bodySmall" color="secondary">
                Disabled border:
              </Text>
              <Text variant="mono">1px, rgba(255,255,255,0.15)</Text>
            </View>
          </Card.Content>
        </Card>

        {/* ============================================
             PASSWORD INPUT
            ============================================ */}
        <Card variant="outlined" className="mb-6">
          <Card.Content>
            <Text variant="h3" className="mb-6">
              Password Input
            </Text>

            <View style={styles.section}>
              <Text variant="bodySmall" color="secondary" className="mb-3">
                Default (toca el icono 👁️ para mostrar/ocultar)
              </Text>
              <PasswordInput
                placeholder="Escribe tu contraseña..."
                defaultValue="miPassword123"
              />
              <Text variant="caption" color="muted" className="mt-2">
                Alterna entre puntos y texto visible
              </Text>
            </View>

            <View style={styles.section}>
              <Text variant="bodySmall" color="secondary" className="mb-3">
                Focused (toca para ver)
              </Text>
              <PasswordInput placeholder="Contraseña..." />
            </View>

            <View style={styles.section}>
              <Text variant="bodySmall" color="secondary" className="mb-3">
                Disabled
              </Text>
              <PasswordInput
                placeholder="Desactivado..."
                defaultValue="noEditable"
                disabled
              />
            </View>
          </Card.Content>
        </Card>

        {/* ============================================
              TEXT VARIANTS PARA VISTAS
             ============================================ */}
        <Card variant="outlined" className="mb-6">
          <Card.Content>
            <Text variant="h3" className="mb-6">
              Text Variants (Vistas)
            </Text>

            <View style={styles.section}>
              <Text variant="bodySmall" color="muted" className="mb-2">
                pageTitle (28px, 600, white) — Login, Bienvenida, Crear Cuenta
              </Text>
              <Text variant="pageTitle">Iniciar Sesión</Text>
            </View>

            <View style={styles.section}>
              <Text variant="bodySmall" color="muted" className="mb-2">
                sectionTitle (24px, 600, white, centered) — Confirmación
                transacciones
              </Text>
              <View style={{ alignItems: "center" }}>
                <Text variant="sectionTitle">¿Confirmas el envío?</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text variant="bodySmall" color="muted" className="mb-2">
                subtitleLarge (18px, 500, gray200) — Subtitulos
              </Text>
              <Text variant="subtitleLarge" color="secondary">
                Ingresa tus credenciales para continuar
              </Text>
            </View>

            <View style={styles.section}>
              <Text variant="bodySmall" color="muted" className="mb-2">
                bodyLarge (16px, 500, gray200) — Texto base
              </Text>
              <Text variant="bodyLarge" color="secondary">
                Este es el texto principal de las vistas.
              </Text>
            </View>

            <View style={styles.section}>
              <Text variant="bodySmall" color="muted" className="mb-2">
                captionLarge (14px, 500, gray200) — Textos complementarios
              </Text>
              <Text variant="captionLarge" color="secondary">
                Texto pequeño para ayudas y descripciones.
              </Text>
            </View>

            <View style={[styles.specRow, { marginTop: spacing[4] }]}>
              <Text variant="bodySmall" color="secondary">
                Color primary:
              </Text>
              <Text variant="mono">#FFFFFF</Text>
            </View>
            <View style={styles.specRow}>
              <Text variant="bodySmall" color="secondary">
                Color secondary (gray200):
              </Text>
              <Text variant="mono">#C7C9D3</Text>
            </View>
            <View style={styles.specRow}>
              <Text variant="bodySmall" color="secondary">
                Font family:
              </Text>
              <Text variant="mono">Neue Haas Grotesk Display Pro</Text>
            </View>
          </Card.Content>
        </Card>

        {/* ============================================
              SELECT (COMBO BOX)
             ============================================ */}
        <Card variant="outlined" className="mb-6">
          <Card.Content>
            <Text variant="h3" className="mb-6">
              Estados del Select
            </Text>

            <View style={styles.section}>
              <Text variant="bodySmall" color="secondary" className="mb-3">
                Default / Activo (sin selección)
              </Text>
              <Select
                placeholder="Seleccionar país..."
                options={COUNTRY_OPTIONS}
                value={selectedCountry}
                onChange={(value) => setSelectedCountry(value)}
                modalTitle="Seleccionar país"
              />
              <Text variant="caption" color="muted" className="mt-2">
                border: 1px rgba(255,255,255,0.50)
              </Text>
            </View>

            <View style={styles.section}>
              <Text variant="bodySmall" color="secondary" className="mb-3">
                Con selección (País + código)
              </Text>
              <Select
                placeholder="Seleccionar país..."
                options={COUNTRY_OPTIONS}
                value={selectedCountry}
                onChange={(value, option) => {
                  setSelectedCountry(value);
                }}
                modalTitle="Seleccionar país"
              />
              {selectedCountry && (
                <Text variant="caption" color="muted" className="mt-2">
                  Seleccionado:{" "}
                  {
                    COUNTRY_OPTIONS.find((o) => o.value === selectedCountry)
                      ?.label
                  }
                </Text>
              )}
            </View>

            <View style={styles.section}>
              <Text variant="bodySmall" color="secondary" className="mb-3">
                Select de Bancos
              </Text>
              <Select
                placeholder="Seleccionar banco..."
                options={BANK_OPTIONS}
                value={selectedBank}
                onChange={(value) => setSelectedBank(value)}
                modalTitle="Seleccionar banco"
              />
              {selectedBank && (
                <Text variant="caption" color="muted" className="mt-2">
                  Seleccionado:{" "}
                  {BANK_OPTIONS.find((o) => o.value === selectedBank)?.label}
                </Text>
              )}
            </View>

            <View style={styles.section}>
              <Text variant="bodySmall" color="secondary" className="mb-3">
                Select de Criptomonedas (prueba el buscador!)
              </Text>
              <Select
                placeholder="Seleccionar criptomoneda..."
                options={CRYPTO_OPTIONS}
                value={selectedCrypto}
                onChange={(value) => setSelectedCrypto(value)}
                modalTitle="Seleccionar criptomoneda"
              />
              {selectedCrypto && (
                <Text variant="caption" color="muted" className="mt-2">
                  Seleccionado:{" "}
                  {
                    CRYPTO_OPTIONS.find((o) => o.value === selectedCrypto)
                      ?.label
                  }
                </Text>
              )}
            </View>

            <View style={styles.section}>
              <Text variant="bodySmall" color="secondary" className="mb-3">
                Disabled
              </Text>
              <Select
                placeholder="Desactivado..."
                options={COUNTRY_OPTIONS}
                value={selectedDisabled}
                onChange={(value) => setSelectedDisabled(value)}
                disabled
                modalTitle="Seleccionar país"
              />
              <View className="flex-row gap-4 mt-2">
                <Text variant="caption" color="muted">
                  border: rgba(255,255,255,0.15)
                </Text>
                <Text variant="caption" color="muted">
                  text: rgba(255,255,255,0.50)
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        <Card variant="outlined">
          <Card.Content>
            <Text variant="h3" className="mb-4">
              Especificación Select
            </Text>

            <View style={styles.specRow}>
              <Text variant="bodySmall" color="secondary">
                Height:
              </Text>
              <Text variant="mono">48px</Text>
            </View>

            <View style={styles.specRow}>
              <Text variant="bodySmall" color="secondary">
                Padding:
              </Text>
              <Text variant="mono">12px horizontal</Text>
            </View>

            <View style={styles.specRow}>
              <Text variant="bodySmall" color="secondary">
                Border radius:
              </Text>
              <Text variant="mono">8px (radius.sm)</Text>
            </View>

            <View style={styles.specRow}>
              <Text variant="bodySmall" color="secondary">
                Background:
              </Text>
              <View
                style={[
                  styles.colorDot,
                  { backgroundColor: semantic.surface.primary },
                ]}
              />
              <Text variant="mono">gray[900] = #232530</Text>
            </View>

            <View style={styles.specRow}>
              <Text variant="bodySmall" color="secondary">
                Typography:
              </Text>
              <Text variant="mono">16px, 500 weight</Text>
            </View>

            <View style={styles.specRow}>
              <Text variant="bodySmall" color="secondary">
                Chevron icon:
              </Text>
              <Text variant="mono">24x24</Text>
            </View>

            <View style={styles.specRow}>
              <Text variant="bodySmall" color="secondary">
                Soporta:
              </Text>
              <Text variant="mono">label, subtitle, icon, image</Text>
            </View>
          </Card.Content>
        </Card>

        {/* ============================================
             BANK SELECT
            ============================================ */}
        <Card variant="outlined" className="mb-6">
          <Card.Content>
            <Text variant="h3" className="mb-6">
              BankSelect
            </Text>

            <View style={styles.section}>
              <Text variant="bodySmall" color="secondary" className="mb-3">
                Seleccionar banco
              </Text>
              <BankSelect
                banks={DEFAULT_BANKS}
                value={selectedBank}
                onChange={(value) => setSelectedBank(value)}
              />
              {selectedBank && (
                <Text variant="caption" color="muted" className="mt-2">
                  Seleccionado:{" "}
                  {DEFAULT_BANKS.find((b) => b.value === selectedBank)?.label}
                </Text>
              )}
            </View>
          </Card.Content>
        </Card>

        {/* ============================================
             CURRENCY INPUT
            ============================================ */}
        <Card variant="outlined" className="mb-6">
          <Card.Content>
            <Text variant="h3" className="mb-6">
              CurrencyInput
            </Text>

            <View style={styles.section}>
              <Text variant="bodySmall" color="secondary" className="mb-3">
                Monto en USD (con límites: min 10, max 10000)
              </Text>
              <CurrencyInput
                value={currencyValue}
                onChange={setCurrencyValue}
                currency="USD"
                currencyPosition="left"
                min={10}
                max={10000}
                placeholder="0.00"
              />
              <Text variant="caption" color="muted" className="mt-2">
                Valor actual: ${currencyValue.toFixed(2)}
              </Text>
            </View>

            <View style={styles.section}>
              <Text variant="bodySmall" color="secondary" className="mb-3">
                Moneda a la derecha
              </Text>
              <CurrencyInput
                value={currencyValue}
                onChange={setCurrencyValue}
                currency="EUR"
                currencyPosition="right"
              />
            </View>

            <View style={styles.section}>
              <Text variant="bodySmall" color="secondary" className="mb-3">
                Desactivado
              </Text>
              <CurrencyInput value={999.99} currency="USD" disabled />
            </View>
          </Card.Content>
        </Card>

        {/* ============================================
             SKELETON LOADING
            ============================================ */}
        <Card variant="outlined" className="mb-6">
          <Card.Content>
            <Text variant="h3" className="mb-6">
              Skeleton Loading
            </Text>

            <View style={styles.section}>
              <Text variant="bodySmall" color="secondary" className="mb-3">
                Tipos de Skeleton
              </Text>

              <View style={styles.skeletonDemoRow}>
                <View style={styles.skeletonDemoItem}>
                  <Text variant="caption" color="muted" className="mb-2">
                    Circular
                  </Text>
                  <SkeletonCircle size={48} />
                </View>

                <View style={styles.skeletonDemoItem}>
                  <Text variant="caption" color="muted" className="mb-2">
                    Texto
                  </Text>
                  <Skeleton width={120} height={16} variant="text" />
                </View>

                <View style={styles.skeletonDemoItem}>
                  <Text variant="caption" color="muted" className="mb-2">
                    Rectangular
                  </Text>
                  <Skeleton width={80} height={40} variant="rectangular" />
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text variant="bodySmall" color="secondary" className="mb-3">
                SkeletonText (múltiples líneas)
              </Text>
              <View style={styles.skeletonListDemo}>
                <SkeletonCircle size={40} />
                <View style={styles.skeletonTextContainer}>
                  <SkeletonText lines={2} />
                </View>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* ============================================
             HORIZONTAL SCROLL
            ============================================ */}
        <Card variant="outlined" className="mb-6">
          <Card.Content>
            <Text variant="h3" className="mb-6">
              HorizontalScroll
            </Text>

            <View style={styles.section}>
              <Text variant="bodySmall" color="secondary" className="mb-3">
                Botones de comercio (con badges)
              </Text>
              <HorizontalScroll
                items={HORIZONTAL_ITEMS}
                selectedId={selectedHorizontalItem}
                onSelect={(id) => setSelectedHorizontalItem(id)}
              />
              <Text variant="caption" color="muted" className="mt-2">
                Seleccionado:{" "}
                {
                  HORIZONTAL_ITEMS.find((i) => i.id === selectedHorizontalItem)
                    ?.label
                }
              </Text>
            </View>

            <View style={styles.section}>
              <Text variant="bodySmall" color="secondary" className="mb-3">
                Variante compact
              </Text>
              <HorizontalScroll
                items={HORIZONTAL_ITEMS.slice(0, 4)}
                variant="compact"
                onSelect={(id) => console.log("Compact selected:", id)}
              />
            </View>
          </Card.Content>
        </Card>

        {/* ============================================
             INFINITE SCROLL LIST
            ============================================ */}
        <Card variant="outlined" className="mb-6">
          <Card.Content>
            <Text variant="h3" className="mb-4">
              InfiniteScrollList
            </Text>
            <Text variant="bodySmall" color="muted" className="mb-6">
              Lista con scroll infinito, skeleton loading y pull-to-refresh
            </Text>

            <View style={styles.infiniteListDemo}>
              <ScrollView
                style={styles.infiniteListScroll}
                contentContainerStyle={styles.infiniteListContent}
                showsVerticalScrollIndicator={false}
              >
                {INFINITE_LIST_ITEMS.slice(0, 8).map((item, index) => (
                  <View key={item.id}>
                    <View style={styles.listItem}>
                      <View style={styles.listItemIcon}>
                        <SkeletonCircle size={40} />
                      </View>
                      <View style={styles.listItemContent}>
                        <Text variant="body">{item.title}</Text>
                        <Text variant="caption" color="muted">
                          {item.subtitle}
                        </Text>
                      </View>
                      <Text
                        variant="body"
                        style={{ color: semantic.brand.primary }}
                      >
                        ${item.amount}
                      </Text>
                    </View>
                    {index < 7 && <View style={styles.listDivider} />}
                  </View>
                ))}
              </ScrollView>
            </View>

            <View style={styles.specRow}>
              <Text variant="bodySmall" color="secondary">
                Características:
              </Text>
              <Text variant="mono">
                skeleton loading, pull-to-refresh, load more, dividers
              </Text>
            </View>
            <View style={styles.specRow}>
              <Text variant="bodySmall" color="secondary">
                Nota:
              </Text>
              <Text variant="mono">
                Usar como componente principal (no anidado en ScrollView)
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* ============================================
             ICON BUTTON (BOTÓN REDONDO)
            ============================================ */}
        <Card variant="outlined" className="mb-6">
          <Card.Content>
            <Text variant="h3" className="mb-6">
              Icon Button Primary
            </Text>

            <View style={styles.iconRow}>
              <View style={styles.iconSection}>
                <Text variant="bodySmall" color="secondary" className="mb-3">
                  Default
                </Text>
                <IconButton
                  variant="primary"
                  icon={
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "600",
                        color: palette.gray[950],
                      }}
                    >
                      +
                    </Text>
                  }
                  onPress={() => console.log("Primary icon pressed")}
                />
              </View>

              <View style={styles.iconSection}>
                <Text variant="bodySmall" color="secondary" className="mb-3">
                  Pressed
                </Text>
                <IconButton
                  variant="primary"
                  icon={
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "600",
                        color: palette.gray[950],
                      }}
                    >
                      +
                    </Text>
                  }
                  onPress={() => {}}
                />
                <Text variant="caption" color="muted" className="mt-2">
                  bg: gray[50]
                </Text>
              </View>

              <View style={styles.iconSection}>
                <Text variant="bodySmall" color="secondary" className="mb-3">
                  Disabled
                </Text>
                <IconButton
                  variant="primary"
                  icon={
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "600",
                        color: palette.gray[950],
                      }}
                    >
                      +
                    </Text>
                  }
                  disabled
                  onPress={() => {}}
                />
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* ============================================
            ICON BUTTON SECONDARY
           ============================================ */}
        <Card variant="outlined" className="mb-6">
          <Card.Content>
            <Text variant="h3" className="mb-6">
              Icon Button Secondary
            </Text>

            <View style={styles.iconRow}>
              <View style={styles.iconSection}>
                <Text variant="bodySmall" color="secondary" className="mb-3">
                  Default
                </Text>
                <IconButton
                  variant="secondary"
                  icon={
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "600",
                        color: palette.white,
                      }}
                    >
                      ↓
                    </Text>
                  }
                  onPress={() => console.log("Secondary icon pressed")}
                />
              </View>

              <View style={styles.iconSection}>
                <Text variant="bodySmall" color="secondary" className="mb-3">
                  Pressed
                </Text>
                <IconButton
                  variant="secondary"
                  icon={
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "600",
                        color: palette.white,
                      }}
                    >
                      ↓
                    </Text>
                  }
                  onPress={() => {}}
                />
                <Text variant="caption" color="muted" className="mt-2">
                  bg: gray[900]
                </Text>
              </View>

              <View style={styles.iconSection}>
                <Text variant="bodySmall" color="secondary" className="mb-3">
                  Disabled
                </Text>
                <IconButton
                  variant="secondary"
                  icon={
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "600",
                        color: palette.white,
                      }}
                    >
                      ↓
                    </Text>
                  }
                  disabled
                  onPress={() => {}}
                />
              </View>
            </View>
          </Card.Content>
        </Card>

        <Card variant="outlined">
          <Card.Content>
            <Text variant="h3" className="mb-4">
              Especificación Icon Button
            </Text>

            <Text variant="subtitle" className="mb-3">
              Primary (bg claro, icono oscuro)
            </Text>

            <View style={styles.specRow}>
              <Text variant="bodySmall" color="secondary">
                Size:
              </Text>
              <Text variant="mono">56x56</Text>
            </View>

            <View style={styles.specRow}>
              <Text variant="bodySmall" color="secondary">
                Default bg:
              </Text>
              <Text variant="mono">#FFFFFF</Text>
            </View>

            <View style={styles.specRow}>
              <Text variant="bodySmall" color="secondary">
                Pressed bg:
              </Text>
              <Text variant="mono">gray[50] = #F0F0F3</Text>
            </View>

            <View style={styles.specRow}>
              <Text variant="bodySmall" color="secondary">
                Icon fill:
              </Text>
              <Text variant="mono">gray[950] = #1A1B24</Text>
            </View>

            <Text variant="subtitle" className="mb-3 mt-6">
              Secondary (bg oscuro, icono blanco)
            </Text>

            <View style={styles.specRow}>
              <Text variant="bodySmall" color="secondary">
                Default bg:
              </Text>
              <Text variant="mono">rgba(255,255,255,0.10)</Text>
            </View>

            <View style={styles.specRow}>
              <Text variant="bodySmall" color="secondary">
                Pressed bg:
              </Text>
              <Text variant="mono">rgba(255,255,255,0.15)</Text>
            </View>

            <View style={styles.specRow}>
              <Text variant="bodySmall" color="secondary">
                Disabled bg:
              </Text>
              <Text variant="mono">rgba(255,255,255,0.05)</Text>
            </View>

            <View style={styles.specRow}>
              <Text variant="bodySmall" color="secondary">
                Icon fill:
              </Text>
              <Text variant="mono">#FFFFFF</Text>
            </View>
          </Card.Content>
        </Card>

        {/* ============================================
            GRADIENT BUTTON (DEGRADADO)
           ============================================ */}
        <Card variant="outlined">
          <Card.Content>
            <Text variant="h3" className="mb-6">
              Gradient Button (Degradado)
            </Text>

            <View style={styles.gradientContainer}>
              <View
                style={[
                  styles.gradientButton,
                  {
                    backgroundColor: palette.blue[500],
                    borderRadius: radius.sm,
                  },
                ]}
              >
                <Text variant="button" style={{ color: palette.white }}>
                  Botón con color #3865C0
                </Text>
              </View>
            </View>

            <Text variant="caption" color="muted" className="mt-4">
              Nota: Para degradados reales usa expo-linear-gradient incluido en
              Expo
            </Text>
            <Text variant="caption" color="muted" className="mt-1">
              npx expo install expo-linear-gradient
            </Text>

            <View style={styles.specRow}>
              <Text variant="bodySmall" color="secondary">
                Color primary:
              </Text>
              <View
                style={[
                  styles.colorDot,
                  { backgroundColor: palette.blue[500] },
                ]}
              />
              <Text variant="mono">#3865C0 (blue[500])</Text>
            </View>

            <View style={styles.specRow}>
              <Text variant="bodySmall" color="secondary">
                Color pressed:
              </Text>
              <View
                style={[
                  styles.colorDot,
                  { backgroundColor: palette.blue[600] },
                ]}
              />
              <Text variant="mono">#274786 (blue[600])</Text>
            </View>
          </Card.Content>
        </Card>

        {/* ============================================
             SWITCH
            ============================================ */}
        <Card variant="outlined" className="mb-6">
          <Card.Content>
            <Text variant="h3" className="mb-6">
              Switch
            </Text>

            <View style={styles.switchRow}>
              <View style={styles.switchSection}>
                <Text variant="bodySmall" color="secondary" className="mb-3">
                  ON (Activo)
                </Text>
                <Switch value={switchValue} onValueChange={setSwitchValue} />
                <Text variant="caption" color="muted" className="mt-2">
                  bg: blue[500]
                </Text>
              </View>

              <View style={styles.switchSection}>
                <Text variant="bodySmall" color="secondary" className="mb-3">
                  OFF (Inactivo)
                </Text>
                <Switch value={switchValue2} onValueChange={setSwitchValue2} />
                <Text variant="caption" color="muted" className="mt-2">
                  bg: rgba(255,255,255,0.10)
                </Text>
              </View>

              <View style={styles.switchSection}>
                <Text variant="bodySmall" color="secondary" className="mb-3">
                  Disabled
                </Text>
                <Switch value={true} onValueChange={() => {}} disabled />
              </View>
            </View>
          </Card.Content>
        </Card>

        <Card variant="outlined">
          <Card.Content>
            <Text variant="h3" className="mb-4">
              Especificación Switch
            </Text>

            <View style={styles.specRow}>
              <Text variant="bodySmall" color="secondary">
                Track width:
              </Text>
              <Text variant="mono">38px</Text>
            </View>

            <View style={styles.specRow}>
              <Text variant="bodySmall" color="secondary">
                Track padding:
              </Text>
              <Text variant="mono">2px</Text>
            </View>

            <View style={styles.specRow}>
              <Text variant="bodySmall" color="secondary">
                Thumb size:
              </Text>
              <Text variant="mono">16x16</Text>
            </View>

            <View style={styles.specRow}>
              <Text variant="bodySmall" color="secondary">
                Border (ambos):
              </Text>
              <Text variant="mono">rgba(255,255,255,0.30)</Text>
            </View>

            <View style={styles.specRow}>
              <Text variant="bodySmall" color="secondary">
                ON bg:
              </Text>
              <View
                style={[
                  styles.colorDot,
                  { backgroundColor: palette.blue[500] },
                ]}
              />
              <Text variant="mono">blue[500] = #3865C0</Text>
            </View>

            <View style={styles.specRow}>
              <Text variant="bodySmall" color="secondary">
                OFF bg:
              </Text>
              <Text variant="mono">rgba(255,255,255,0.10)</Text>
            </View>

            <View style={styles.specRow}>
              <Text variant="bodySmall" color="secondary">
                Thumb bg (ambos):
              </Text>
              <View
                style={[styles.colorDot, { backgroundColor: palette.white }]}
              />
              <Text variant="mono">#FFFFFF</Text>
            </View>

            <View style={styles.specRow}>
              <Text variant="bodySmall" color="secondary">
                Thumb shadow:
              </Text>
              <Text variant="mono">2px 4px rgba(0,0,0,0.15)</Text>
            </View>
          </Card.Content>
        </Card>

        {/* ============================================
              GLASS BUTTON
             ============================================ */}
        <Card variant="outlined" className="mb-6">
          <Card.Content>
            <Text variant="h3" className="mb-6">
              Glass Button
            </Text>

            <View style={styles.glassRow}>
              <View style={styles.glassSection}>
                <Text variant="bodySmall" color="secondary" className="mb-3">
                  Circular (iconName)
                </Text>
                <GlassButton
                  iconName="send"
                  onPress={() => console.log("Send pressed")}
                />
              </View>

              <View style={styles.glassSection}>
                <Text variant="bodySmall" color="secondary" className="mb-3">
                  Circular 2
                </Text>
                <GlassButton
                  iconName="receive"
                  onPress={() => console.log("Receive pressed")}
                />
              </View>

              <View style={styles.glassSection}>
                <Text variant="bodySmall" color="secondary" className="mb-3">
                  Con Search
                </Text>
                <GlassButton
                  iconName="search"
                  onPress={() => console.log("Search pressed")}
                />
              </View>

              <View style={styles.glassSection}>
                <Text variant="bodySmall" color="secondary" className="mb-3">
                  Disabled
                </Text>
                <GlassButton iconName="clock" disabled onPress={() => {}} />
              </View>
            </View>

            <View style={styles.glassRow}>
              <View style={styles.glassSection}>
                <Text variant="bodySmall" color="secondary" className="mb-3">
                  + Label
                </Text>
                <GlassButton
                  iconName="add"
                  label="Agregar"
                  onPress={() => {}}
                />
              </View>

              <View style={styles.glassSection}>
                <Text variant="bodySmall" color="secondary" className="mb-3">
                  Enviar
                </Text>
                <GlassButton
                  iconName="send"
                  label="Enviar"
                  onPress={() => {}}
                />
              </View>
            </View>
          </Card.Content>
        </Card>

        <Card variant="outlined">
          <Card.Content>
            <Text variant="h3" className="mb-4">
              Especificación Glass Button
            </Text>

            <View style={styles.specRow}>
              <Text variant="bodySmall" color="secondary">
                Size (solo icono):
              </Text>
              <Text variant="mono">42x42px</Text>
            </View>

            <View style={styles.specRow}>
              <Text variant="bodySmall" color="secondary">
                Height:
              </Text>
              <Text variant="mono">42px</Text>
            </View>

            <View style={styles.specRow}>
              <Text variant="bodySmall" color="secondary">
                Padding:
              </Text>
              <Text variant="mono">12px</Text>
            </View>

            <View style={styles.specRow}>
              <Text variant="bodySmall" color="secondary">
                Border radius:
              </Text>
              <Text variant="mono">99px (radius.full)</Text>
            </View>

            <View style={styles.specRow}>
              <Text variant="bodySmall" color="secondary">
                iOS 16+:
              </Text>
              <Text variant="mono">GlassView (expo-glass-effect)</Text>
            </View>

            <View style={styles.specRow}>
              <Text variant="bodySmall" color="secondary">
                Android / iOS antiguo:
              </Text>
              <Text variant="mono">rgba(95, 95, 102, 0.10)</Text>
            </View>

            <View style={styles.specRow}>
              <Text variant="bodySmall" color="secondary">
                {`Android/iOS <16:`}
              </Text>
              <Text variant="mono">rgba(95, 95, 102, 0.10)</Text>
            </View>

            <View style={styles.specRow}>
              <Text variant="bodySmall" color="secondary">
                Icon fill:
              </Text>
              <Text variant="mono">#FFFFFF</Text>
            </View>

            <View style={styles.specRow}>
              <Text variant="bodySmall" color="secondary">
                Label color:
              </Text>
              <View
                style={[
                  styles.colorDot,
                  { backgroundColor: palette.gray[100] },
                ]}
              />
              <Text variant="mono">gray[100] = #E4E5EB</Text>
            </View>
          </Card.Content>
        </Card>

        {/* ============================================
               LIQUID GLASS DEMO - Full Components
              ============================================ */}
        <Card variant="outlined" className="mb-6">
          <Card.Content>
            <Text variant="h3" className="mb-2">
              Liquid Glass Effect Components
            </Text>
            <Text variant="bodySmall" color="muted" className="mb-6">
              {apiStatus.isGlassEffectAvailable
                ? "Native Liquid Glass API available (iOS 26+)"
                : "Using visible fallback (Android or iOS <26)"}
            </Text>

            <View style={styles.glassDemoContainer}>
              <GlassCard style={styles.glassCardDemo}>
                <GlassCard.Header>
                  <Text variant="h4">Glass Card</Text>
                </GlassCard.Header>
                <GlassCard.Content>
                  <Text variant="body" color="secondary">
                    This card uses GlassView on iOS 26+ for a real liquid glass
                    effect. On other platforms, it shows a highly visible
                    fallback with border.
                  </Text>
                </GlassCard.Content>
                <GlassCard.Footer>
                  <View style={styles.glassCardActions}>
                    <GlassButton
                      icon={
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: "600",
                            color: palette.white,
                          }}
                        >
                          ✓
                        </Text>
                      }
                      label="Confirm"
                      onPress={() => console.log("Glass confirm pressed")}
                    />
                    <GlassButton
                      icon={
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: "600",
                            color: palette.white,
                          }}
                        >
                          ✕
                        </Text>
                      }
                      label="Cancel"
                      onPress={() => console.log("Glass cancel pressed")}
                    />
                  </View>
                </GlassCard.Footer>
              </GlassCard>

              <View style={styles.glassSectionVertical}>
                <Text variant="bodySmall" color="secondary" className="mb-3">
                  Glass Modal Demo
                </Text>
                <Button variant="primary" onPress={() => setModalVisible(true)}>
                  Open Glass Modal
                </Button>
              </View>

              <View style={styles.glassSectionVertical}>
                <Text variant="bodySmall" color="secondary" className="mb-3">
                  Glass Card Specs
                </Text>
                <View style={styles.specRow}>
                  <Text variant="mono" color="muted">
                    Fallback bg:
                  </Text>
                  <Text variant="mono">rgba(255,255,255,0.12) + border</Text>
                </View>
                <View style={styles.specRow}>
                  <Text variant="mono" color="muted">
                    Native iOS:
                  </Text>
                  <Text variant="mono">GlassView with regular effect</Text>
                </View>
                <View style={styles.specRow}>
                  <Text variant="mono" color="muted">
                    Border radius:
                  </Text>
                  <Text variant="mono">12px (radiusUsage.card)</Text>
                </View>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* ============================================
               GLASS NAVBAR & BOTTOM BAR PREVIEW
              ============================================ */}
        <Card variant="outlined">
          <Card.Content>
            <Text variant="h3" className="mb-2">
              Glass Navigation Components
            </Text>
            <Text variant="bodySmall" color="muted" className="mb-6">
              GlassNavbar and GlassBottomBar for floating navigation with
              content behind
            </Text>

            <View style={styles.navbarPreview}>
              <View style={styles.navbarPreviewInner}>
                <View style={styles.navbarFakeBackground}>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <View
                      key={i}
                      style={[styles.navbarFakeLine, { opacity: 1 - i * 0.15 }]}
                    />
                  ))}
                </View>
                <View style={styles.navbarPreviewOverlay}>
                  <View style={styles.navbarPreviewGlass}>
                    <View style={styles.navbarLeft}>
                      <Text style={{ fontSize: 18, color: palette.white }}>
                        ←
                      </Text>
                    </View>
                    <View style={styles.navbarTitle}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "600",
                          color: palette.white,
                        }}
                      >
                        GlassNavbar
                      </Text>
                    </View>
                    <View style={styles.navbarRight}>
                      <Text style={{ fontSize: 18, color: palette.white }}>
                        ⚙
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <Text variant="caption" color="muted" className="mt-4">
                GlassNavbar sits as absolute positioned view with content
                scrolling behind
              </Text>
            </View>

            <View style={styles.specRow}>
              <Text variant="bodySmall" color="secondary">
                GlassNavbar height:
              </Text>
              <Text variant="mono">56px + SafeAreaView</Text>
            </View>
            <View style={styles.specRow}>
              <Text variant="bodySmall" color="secondary">
                GlassBottomBar height:
              </Text>
              <Text variant="mono">64px + SafeAreaView</Text>
            </View>
          </Card.Content>
        </Card>

        <GlassModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          title="Glass Modal"
        >
          <Text variant="body" color="secondary" className="mb-4">
            This modal uses the liquid glass effect on iOS 26+. Notice the
            subtle blur and tint. On other platforms, the fallback is visible
            with increased opacity and a border.
          </Text>
          <View style={styles.glassCardActions}>
            <Button variant="primary" onPress={() => setModalVisible(false)}>
              Got it
            </Button>
          </View>
        </GlassModal>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: spacing[6],
  },
  specRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
    paddingVertical: spacing[1],
  },
  colorDot: {
    width: 16,
    height: 16,
    borderRadius: 4,
  },
  iconRow: {
    flexDirection: "row",
    gap: spacing[6],
    alignItems: "flex-start",
  },
  iconSection: {
    alignItems: "center",
  },
  gradientContainer: {
    alignItems: "center",
  },
  gradientButton: {
    width: "100%",
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  switchRow: {
    flexDirection: "row",
    gap: spacing[8],
    alignItems: "flex-start",
  },
  switchSection: {
    alignItems: "center",
  },
  glassRow: {
    flexDirection: "row",
    gap: spacing[6],
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  glassSection: {
    alignItems: "center",
  },
  glassDemoContainer: {
    gap: spacing[6],
  },
  glassCardDemo: {
    width: "100%",
  },
  glassCardActions: {
    flexDirection: "row",
    gap: spacing[3],
    flexWrap: "wrap",
  },
  glassSectionVertical: {
    gap: spacing[3],
  },
  navbarPreview: {
    gap: spacing[3],
  },
  navbarPreviewInner: {
    width: "100%",
    height: 180,
    borderRadius: radius.sm,
    overflow: "hidden",
    position: "relative",
    backgroundColor: semantic.background.secondary,
  },
  navbarFakeBackground: {
    padding: spacing[4],
    gap: spacing[3],
  },
  navbarFakeLine: {
    height: 12,
    borderRadius: 3,
    backgroundColor: palette.gray[700],
  },
  navbarPreviewOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  navbarPreviewGlass: {
    height: 56,
    backgroundColor: `rgba(255, 255, 255, 0.10)`,
    borderBottomWidth: 1,
    borderBottomColor: `rgba(255, 255, 255, 0.20)`,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing[4],
  },
  navbarLeft: {
    width: 40,
  },
  navbarTitle: {
    flex: 1,
    alignItems: "center",
  },
  navbarRight: {
    width: 40,
    alignItems: "flex-end",
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing[3],
    marginBottom: spacing[4],
  },
  statusDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginTop: 3,
  },
  statusTextContainer: {
    flex: 1,
    gap: spacing[1],
  },
  glassTestContainer: {
    width: "100%",
    alignItems: "center",
  },
  glassTestBackground: {
    width: 300,
    height: 300,
    borderRadius: radius.md,
    overflow: "hidden",
    position: "relative",
  },
  glassTestImage: {
    width: "100%",
    height: "100%",
  },
  glassTestGlass: {
    position: "absolute",
    top: 80,
    left: 50,
    width: 200,
    height: 140,
    borderRadius: 12,
  },
  glassTestFallback: {
    backgroundColor: `rgba(255, 255, 255, 0.15)`,
    borderWidth: 1,
    borderColor: `rgba(255, 255, 255, 0.30)`,
  },
  glassTestLabel: {
    position: "absolute",
    top: 130,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  enhancedGlassContainer: {
    width: "100%",
    alignItems: "center",
  },
  enhancedGlassBackground: {
    width: 340,
    height: 340,
    borderRadius: radius.md,
    overflow: "hidden",
    position: "relative",
  },
  enhancedGlassImage: {
    width: "100%",
    height: "100%",
  },
  enhancedGlassOverlay: {
    position: "absolute",
    top: 40,
    left: 20,
    right: 20,
  },
  enhancedGlassCardBg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 12,
  },
  enhancedGlassContent: {
    position: "relative",
    zIndex: 1,
    padding: spacing[4],
  },
  enhancedGlassButtons: {
    flexDirection: "row",
    gap: spacing[3],
    flexWrap: "wrap",
  },
  enhancedGlassButtonWrapper: {
    height: 42,
    borderRadius: 999,
    overflow: "hidden",
    paddingHorizontal: spacing[3],
    minWidth: 100,
  },
  glassButtonContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    zIndex: 1,
  },
  skeletonDemoRow: {
    flexDirection: "row",
    gap: spacing[6],
    alignItems: "flex-start",
  },
  skeletonDemoItem: {
    alignItems: "center",
  },
  skeletonListDemo: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[3],
    padding: spacing[3],
    backgroundColor: semantic.surface.secondary,
    borderRadius: radius.sm,
  },
  skeletonTextContainer: {
    flex: 1,
    gap: spacing[2],
  },
  infiniteListDemo: {
    height: 300,
    width: "100%",
    backgroundColor: semantic.background.secondary,
    borderRadius: radius.sm,
    overflow: "hidden",
  },
  infiniteListScroll: {
    flex: 1,
    width: "100%",
  },
  infiniteListContent: {
    flexGrow: 1,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing[3],
    gap: spacing[3],
  },
  listItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
  },
  listItemContent: {
    flex: 1,
    gap: spacing[1],
  },
  listDivider: {
    height: 1,
    backgroundColor: semantic.border.subtle,
    marginHorizontal: spacing[3],
  },
});
