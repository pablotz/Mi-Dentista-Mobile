import React from 'react';
import Svg, {Path,Line,Polyline,G} from 'react-native-svg';

export default function LeftArrow({color,height,width,style}) {
  
    return (  
    <Svg             
        height={height}
        stroke={color}
        width={width}        
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox={`0 0 24 24`}
        xmlns="http://www.w3.org/2000/svg">    
    <Line
        x1="20"
        x2="4"
        y1="12"
        y2="12"/>
    <Polyline
    points="14 6 20 12 14 18"    
    transform="rotate(180,12,12)" />
    </Svg>
  );
}