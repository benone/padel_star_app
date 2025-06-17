import React from 'react';
import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg';

interface SendArrowIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export default function SendArrowIcon({ width = 13, height = 14, color = 'white' }: SendArrowIconProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 13 14"
      fill="none"
    >
      <G clipPath="url(#clip0_45_118)">
        <Path
          d="M11.993 7.61797C12.3348 7.27617 12.3348 6.72109 11.993 6.3793L7.61797 2.0043C7.27617 1.6625 6.72109 1.6625 6.3793 2.0043C6.0375 2.34609 6.0375 2.90117 6.3793 3.24297L9.26406 6.125H0.875C0.391016 6.125 0 6.51602 0 7C0 7.48398 0.391016 7.875 0.875 7.875H9.26133L6.38203 10.757C6.04023 11.0988 6.04023 11.6539 6.38203 11.9957C6.72383 12.3375 7.27891 12.3375 7.6207 11.9957L11.9957 7.6207L11.993 7.61797Z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_45_118">
          <Path d="M0 0H12.25V14H0V0Z" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}