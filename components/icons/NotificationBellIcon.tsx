import React from 'react';
import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg';

interface NotificationBellIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export default function NotificationBellIcon({ width = 18, height = 20, color = 'white' }: NotificationBellIconProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 18 20"
      fill="none"
    >
      <G clipPath="url(#clip0_25_138)">
        <Path
          d="M8.75 0C8.05859 0 7.5 0.558594 7.5 1.25V1.94922C4.66797 2.39844 2.5 4.85156 2.5 7.8125V9.11719C2.5 10.8906 1.89453 12.6133 0.789063 13.9961L0.207031 14.7266C-0.0195313 15.0078 -0.0625 15.3945 0.09375 15.7187C0.25 16.043 0.578125 16.25 0.9375 16.25H16.5625C16.9219 16.25 17.25 16.043 17.4062 15.7187C17.5625 15.3945 17.5195 15.0078 17.293 14.7266L16.7109 14C15.6055 12.6133 15 10.8906 15 9.11719V7.8125C15 4.85156 12.832 2.39844 10 1.94922V1.25C10 0.558594 9.44141 0 8.75 0ZM8.75 3.75H9.0625C11.3047 3.75 13.125 5.57031 13.125 7.8125V9.11719C13.125 10.9883 13.668 12.8125 14.6758 14.375H2.82422C3.83203 12.8125 4.375 10.9883 4.375 9.11719V7.8125C4.375 5.57031 6.19531 3.75 8.4375 3.75H8.75ZM11.25 17.5H8.75H6.25C6.25 18.1641 6.51172 18.8008 6.98047 19.2695C7.44922 19.7383 8.08594 20 8.75 20C9.41406 20 10.0508 19.7383 10.5195 19.2695C10.9883 18.8008 11.25 18.1641 11.25 17.5Z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_25_138">
          <Path d="M0 0H17.5V20H0V0Z" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}