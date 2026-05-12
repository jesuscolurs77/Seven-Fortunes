import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { palette, radius, semantic, spacing } from "@/theme";
import { Button, Card, IconButton, Input, Screen, Text } from "@/ui";

export default function IndexScreen() {
  return (
    <Screen>
      <ScrollView contentContainerStyle={{ paddingVertical: spacing[8] }}>
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
});
