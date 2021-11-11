import React from 'react';
import Svg, {Path,Line,Polyline,G} from 'react-native-svg';

export default function Add({color,height,width}) {
  
    return (  
        <Svg 
            stroke={color}
            fill={color}
            height={height}
            width={width}
            style="enable-background:new 0 0 32 32;" 
            viewBox="0 0 32 32">
            <Path d="M28,14H18V4c0-1.104-0.896-2-2-2s-2,0.896-2,2v10H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h10v10c0,1.104,0.896,2,2,2  s2-0.896,2-2V18h10c1.104,0,2-0.896,2-2S29.104,14,28,14z"/>
        </Svg>
  );
}