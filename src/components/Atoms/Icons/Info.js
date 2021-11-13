import React from 'react';
import Svg, {Path,Line,Polyline,G,Defs,Rect} from 'react-native-svg';

export default function Search({color,height,width}) {
  
    return (  
      <Svg viewBox="0 0 32 32"
      stroke={color}
      height={height}
      width={width}>
        <Defs>
          </Defs>
            <G data-name="Layer 2" id="Layer_2">
            <Path fill={color} d="M16,12a2,2,0,1,1,2-2A2,2,0,0,1,16,12Zm0-2Z"/>
            <Path fill={color} d="M16,29A13,13,0,1,1,29,16,13,13,0,0,1,16,29ZM16,5A11,11,0,1,0,27,16,11,11,0,0,0,16,5Z"/>
            <Path fill={color} d="M16,24a2,2,0,0,1-2-2V16a2,2,0,0,1,4,0v6A2,2,0,0,1,16,24Zm0-8v0Z"/>
            </G>
            <G id="frame">
          </G>
      </Svg>
  );
}