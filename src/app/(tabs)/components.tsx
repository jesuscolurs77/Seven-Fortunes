import React from "react";
import {
  Image,
  Platform,
  Text as RNText,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { palette, radius, semantic, spacing } from "@/theme";
import {
  Button,
  Card,
  GlassButton,
  GlassCard,
  GlassModal,
  IconButton,
  Input,
  Screen,
  Switch,
  Text,
} from "@/ui";

let GlassViewDirect: any = null;
let isGlassEffectAPIAvailableFn: (() => boolean) | null = null;
let isLiquidGlassAvailableFn: (() => boolean) | null = null;

// eslint-disable-next-line @typescript-eslint/no-require-imports
try {
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

export default function ComponentsScreen() {
  const [switchValue, setSwitchValue] = React.useState(true);
  const [switchValue2, setSwitchValue2] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);

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
      <ScrollView contentContainerStyle={{ paddingVertical: spacing[8] }}>
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
                Cargando...
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
                Cargando...
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
                  Solo Icono (42x42)
                </Text>
                <GlassButton
                  icon={
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "600",
                        color: palette.white,
                      }}
                    >
                      +
                    </Text>
                  }
                  onPress={() => console.log("Glass button pressed")}
                />
              </View>

              <View style={styles.glassSection}>
                <Text variant="bodySmall" color="secondary" className="mb-3">
                  Icono + Texto
                </Text>
                <GlassButton
                  icon={
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "600",
                        color: palette.white,
                      }}
                    >
                      +
                    </Text>
                  }
                  label="Agregar"
                  onPress={() => {}}
                />
              </View>

              <View style={styles.glassSection}>
                <Text variant="bodySmall" color="secondary" className="mb-3">
                  Disabled
                </Text>
                <GlassButton
                  icon={
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "600",
                        color: palette.white,
                      }}
                    >
                      +
                    </Text>
                  }
                  label="Desactivado"
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
});
