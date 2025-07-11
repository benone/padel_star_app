import React from 'react';
import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg';

interface ChartIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export default function ChartIcon({ width = 14, height = 14, color = '#FACC15' }: ChartIconProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 14 14"
      fill="none"
    >
      <G clipPath="url(#clip0_25_144)">
        <Path
          d="M1.75 1.75C1.75 1.26602 1.35898 0.875 0.875 0.875C0.391016 0.875 0 1.26602 0 1.75V10.9375C0 12.1461 0.978906 13.125 2.1875 13.125H13.125C13.609 13.125 14 12.734 14 12.25C14 11.766 13.609 11.375 13.125 11.375H2.1875C1.94687 11.375 1.75 11.1781 1.75 10.9375V1.75ZM12.868 4.11797C13.2098 3.77617 13.2098 3.22109 12.868 2.8793C12.5262 2.5375 11.9711 2.5375 11.6293 2.8793L8.75 5.76133L7.18047 4.1918C6.83867 3.85 6.28359 3.85 5.9418 4.1918L2.8793 7.2543C2.5375 7.59609 2.5375 8.15117 2.8793 8.49297C3.22109 8.83477 3.77617 8.83477 4.11797 8.49297L6.5625 6.05117L8.13203 7.6207C8.47383 7.9625 9.02891 7.9625 9.3707 7.6207L12.8707 4.1207L12.868 4.11797Z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_25_144">
          <Path d="M0 0H14V14H0V0Z" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}