import React, { useMemo } from 'react';
import { SvgXml } from 'react-native-svg';

export interface ChevronDownIconProps {
  color?: string;
  width?: number | string;
  height?: number | string;
}

const CHEVRON_DOWN_XML = `
<svg xmlns="http://www.w3.org/2000/svg" width="14" height="9" viewBox="0 0 14 9" fill="none">
  <path d="M5.94 7.6368L6.7884 8.4852L13.5768 1.6968L11.88 0L6.7884 5.0904L1.6968 0L0 1.6968L5.94 7.6368Z" fill="{{color}}"/>
</svg>
`;

export function ChevronDownIcon({
  color = 'white',
  width = 14,
  height = 9,
}: ChevronDownIconProps = {}) {
  const xml = useMemo(() => {
    return CHEVRON_DOWN_XML.replace('{{color}}', color);
  }, [color]);

  return <SvgXml xml={xml} width={width} height={height} />;
}
