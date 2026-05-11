/**
 * ⚠️ ATENCIÓN: Sincronización manual con tokens TS (src/theme/)
 * 
 * ESTE ARCHIVO replica valores de src/theme/ para uso con NativeWind.
 * 
 * ESTRATEGIA HÍBRIDA:
 * 
 * ✅ Usa NativeWind/className para:
 *    - layout (flex, flexDirection, justifyContent, alignItems)
 *    - spacing (padding, margin, gap)
 *    - border radius simples
 *    - colores básicos cuando no haya variante semántica
 *    - estados básicos
 * 
 * ❌ NO uses NativeWind/className para:
 *    - typography (fontFamily, lineHeight, letterSpacing precisos)
 *    - elevation/shadows (son tokens completos de ViewStyle)
 *    - animaciones Reanimated
 *    - estilos complejos
 *    - VARIANTES SEMÁNTICAS (usa tokens semantic.background.* desde TS)
 * 
 * Fuente de verdad: src/theme/*.ts
 * Si cambias un token en theme/, actualiza aquí también.
 * 
 * (En el futuro podemos automatizar con un script build-time)
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      // ============================================
      // COLORES - solo PALETA básica para NativeWind
      // Para variantes SEMÁNTICAS (background.primary, text.secondary)
      // usa directamente: semantic.background.primary desde @/theme
      // ============================================
      colors: {
        white: '#FFFFFF',

        // Palette gray sync: src/theme/colors.ts
        'gray-5': '#F8F8FA',
        'gray-50': '#F0F0F3',
        'gray-100': '#E4E5EB',
        'gray-200': '#C7C9D3',
        'gray-300': '#AEB0BE',
        'gray-400': '#9395A9',
        'gray-500': '#7B7D95',
        'gray-600': '#60647D',
        'gray-700': '#4D4F63',
        'gray-800': '#363848',
        'gray-900': '#232530',
        'gray-950': '#1A1B24',

        // Palette blue sync: src/theme/colors.ts
        'blue-5': '#F5F7FC',
        'blue-50': '#EBF0F9',
        'blue-100': '#D7E0F2',
        'blue-200': '#C3D1EC',
        'blue-300': '#9BB2DF',
        'blue-400': '#7493D3',
        'blue-500': '#3865C0',
        'blue-600': '#274786',
        'blue-700': '#1C3360',
        'blue-800': '#111E3A',
        'blue-900': '#0B1426',
        'blue-950': '#060A13',

        // Status colors para casos simples
        success: '#34C759',
        warning: '#FF9F0A',
        error: '#FF453A',
        info: '#5AC8FA',
      },

      // ============================================
      // SPACING - sync: src/theme/spacing.ts
      // ============================================
      spacing: {
        0: 0,
        1: 4,
        2: 8,
        3: 12,
        4: 16,
        5: 20,
        6: 24,
        8: 32,
        10: 40,
        12: 48,
        16: 64,
        20: 80,
      },

      // ============================================
      // BORDER RADIUS - sync: src/theme/radius.ts
      // ============================================
      borderRadius: {
        sm: 8,
        md: 12,
        lg: 16,
        xl: 20,
        '2xl': 24,
        full: 9999,
      },

      // ============================================
      // FONT SIZE - SIMPLIFICADO solo para casos rápidos
      //
      // ⚠️ PARA TYPOGRAPHY REAL usa el componente <Text> con variant
      // que usa StyleSheet + typography.* tokens completos (con fontFamily,
      // lineHeight, letterSpacing, fontWeight precisos)
      // ============================================
      fontSize: {
        xs: [12, { lineHeight: 16 }],
        sm: [13, { lineHeight: 18 }],
        base: [15, { lineHeight: 20 }],
        lg: [17, { lineHeight: 22 }],
        xl: [20, { lineHeight: 26 }],
        '2xl': [24, { lineHeight: 30 }],
        '3xl': [36, { lineHeight: 42 }],
        '4xl': [48, { lineHeight: 54 }],
      },

      // ============================================
      // OPACITY - sync: src/theme/opacity.ts
      // ============================================
      opacity: {
        5: 0.05,
        10: 0.1,
        15: 0.15,
        30: 0.3,
        50: 0.5,
        70: 0.7,
        40: 0.4,  // disabled
      },
    },
  },
  plugins: [],
};
