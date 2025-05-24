import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const ProfileIcon = (props: SvgProps) => (
  <Svg width={54} height={54} fill="none" {...props}>
    <Path
      stroke="#A1A5C1"
      strokeLinejoin="round"
      strokeWidth={4.5}
      d="M3 45a12 12 0 0 1 12-12h24a12 12 0 0 1 12 12 6 6 0 0 1-6 6H9a6 6 0 0 1-6-6Z"
    />
    <Path
      stroke="#A1A5C1"
      strokeWidth={4.5}
      d="M27 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
    />
  </Svg>
);
export default ProfileIcon;
