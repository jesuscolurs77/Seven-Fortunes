import { useState, useEffect } from 'react';
import { Platform } from 'react-native';

let _loaded = false;
let GlassViewComponent: any = null;
let GlassContainerComponent: any = null;
let isGlassEffectAPIAvailableFn: (() => boolean) | null = null;
let isLiquidGlassAvailableFn: (() => boolean) | null = null;

function ensureLoaded(): void {
  if (_loaded) return;
  _loaded = true;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const expoGlassEffect = require('expo-glass-effect');
    GlassViewComponent = expoGlassEffect.GlassView || null;
    GlassContainerComponent = expoGlassEffect.GlassContainer || null;
    isGlassEffectAPIAvailableFn = expoGlassEffect.isGlassEffectAPIAvailable || null;
    isLiquidGlassAvailableFn = expoGlassEffect.isLiquidGlassAvailable || null;
  } catch {
    GlassViewComponent = null;
    GlassContainerComponent = null;
  }
}

export { GlassViewComponent, GlassContainerComponent };

function checkRuntimeAvailability(): boolean {
  ensureLoaded();
  if (Platform.OS !== 'ios' || !GlassViewComponent) return false;
  try {
    const runtime = isGlassEffectAPIAvailableFn ? isGlassEffectAPIAvailableFn() : true;
    const compile = isLiquidGlassAvailableFn ? isLiquidGlassAvailableFn() : true;
    return runtime && compile;
  } catch {
    return false;
  }
}

export function useIsGlassAvailable(): boolean {
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    setAvailable(checkRuntimeAvailability());
  }, []);

  return available;
}

export function isGlassModuleLoaded(): boolean {
  return GlassViewComponent !== null;
}
