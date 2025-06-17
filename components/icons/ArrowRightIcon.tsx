import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

interface ArrowRightIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export default function ArrowRightIcon({ width = 10, height = 16, color = '#9CA3AF' }: ArrowRightIconProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 10 16"
      fill="none"
    >
      <G>
        <Path
          d="M9.70625 7.29375C10.0969 7.68437 10.0969 8.31875 9.70625 8.70938L3.70625 14.7094C3.31562 15.1 2.68125 15.1 2.29063 14.7094C1.9 14.3188 1.9 13.6844 2.29063 13.2938L7.58437 8L2.29375 2.70625C1.90313 2.31562 1.90313 1.68125 2.29375 1.29062C2.68438 0.9 3.31875 0.9 3.70937 1.29062L9.70938 7.29062L9.70625 7.29375Z"
          fill={color}
        />
      </G>
    </Svg>
  );
}