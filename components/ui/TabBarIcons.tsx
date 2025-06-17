import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const HomeIcon = ({ color, size = 24 }: { color: string; size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 23 20" fill="none">
    <Path d="M19.875 19.5V11.7239C19.875 11.0268 19.6111 10.3586 19.1458 9.86766L13.1458 3.51923C12.1931 2.51047 10.6319 2.51047 9.67917 3.51923L3.67917 9.86766C3.21389 10.3586 2.95 11.0268 2.95 11.7239V19.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <Path d="M1 19.5H21.825" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <Path d="M14.8501 19.5V15C14.8501 13.8954 13.9546 13 12.8501 13H10.0001C8.89548 13 8.00006 13.8954 8.00006 15V19.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

export const CommunityIcon = ({ color, size = 24 }: { color: string; size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 25 20" fill="none">
    <Path d="M8.5 6C10.1569 6 11.5 4.65685 11.5 3C11.5 1.34315 10.1569 0 8.5 0C6.84315 0 5.5 1.34315 5.5 3C5.5 4.65685 6.84315 6 8.5 6Z" fill={color}/>
    <Path d="M3 20C1.34315 20 0 18.6569 0 17V16C0 13.7909 1.79086 12 4 12H13C15.2091 12 17 13.7909 17 16V17C17 18.6569 15.6569 20 15 20H3Z" fill={color}/>
    <Path d="M17.5 6C19.1569 6 20.5 4.65685 20.5 3C20.5 1.34315 19.1569 0 17.5 0C15.8431 0 14.5 1.34315 14.5 3C14.5 4.65685 15.8431 6 17.5 6Z" fill={color}/>
    <Path d="M17.5454 12H21C23.2091 12 25 13.7909 25 16V17C25 18.6569 23.6569 20 22 20H17C17 20 17.4951 16.8686 17.5454 12Z" fill={color}/>
  </Svg>
);

export const ProfileIcon = ({ color, size = 24 }: { color: string; size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 18 20" fill="none">
    <Path d="M9 9C11.7614 9 14 6.76142 14 4C14 1.23858 11.7614 -1 9 -1C6.23858 -1 4 1.23858 4 4C4 6.76142 6.23858 9 9 9Z" fill={color}/>
    <Path d="M0.25 17C0.25 14.3766 2.37665 12.25 5 12.25H13C15.6234 12.25 17.75 14.3766 17.75 17V18C17.75 19.1046 16.8546 20 15.75 20H2.25C1.14543 20 0.25 19.1046 0.25 18V17Z" fill={color}/>
  </Svg>
);