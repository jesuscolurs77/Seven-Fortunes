import React, { useMemo } from 'react';
import { SvgXml } from 'react-native-svg';

import { ICON_REGISTRY, IconData } from './registry';

export interface IconProps {
  name: string;
  color?: string;
  opacity?: number;
  width?: number | string;
  height?: number | string;
}

const DEFAULT_COLOR = 'white';
const DEFAULT_OPACITY = 1;

function getIconData(name: string): IconData | null {
  const data = ICON_REGISTRY[name];
  if (data) return data;

  const kebabName = name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  return ICON_REGISTRY[kebabName] || ICON_REGISTRY[name.toLowerCase()] || null;
}

export function Icon({
  name,
  color = DEFAULT_COLOR,
  opacity = DEFAULT_OPACITY,
  width,
  height,
}: IconProps) {
  const iconData = useMemo(() => getIconData(name), [name]);
  const xml = useMemo(() => {
    if (!iconData) {
      return '';
    }

    let svg = iconData.svg;
    svg = svg.replace(/\{\{color\}\}/g, color);
    svg = svg.replace(/\{\{opacity\}\}/g, String(opacity));
    return svg;
  }, [iconData, color, opacity]);

  if (!iconData) {
    console.warn(`Icon "${name}" not found in registry`);
    return null;
  }

  const finalWidth = width ?? iconData.defaultWidth;
  const finalHeight = height ?? iconData.defaultHeight;

  return <SvgXml xml={xml} width={finalWidth} height={finalHeight} />;
}

export function getIconNames(): string[] {
  return Object.keys(ICON_REGISTRY);
}

export { ICON_REGISTRY };
