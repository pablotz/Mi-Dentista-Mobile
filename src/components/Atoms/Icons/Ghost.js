import React from 'react';
import Svg, {Path,Circle} from 'react-native-svg';

export default function Ghost({color,height,width}) {
  
    return ( 
        <Svg             
            fill={color}
            viewBox="0 0 24 24" 
            height={height}
            width={width}>
            <Path d="M18,12a1,1,0,0,1-1-1V9A5,5,0,0,0,7,9v2a1,1,0,0,1-2,0V9A7,7,0,0,1,19,9v2A1,1,0,0,1,18,12Z"/>
            <Path class="cls-1" d="M20,22H11.93A6.94,6.94,0,0,1,5,15.07a1,1,0,0,1,1-1,1,1,0,0,1,1,1,5,5,0,0,0,4.93,5H20a1,1,0,0,1,0,2Z"/>
            <Path class="cls-1" d="M18,19a1,1,0,0,1-1-1V15a1,1,0,0,1,1-1h1a1,1,0,0,0,0-2H18a1,1,0,0,1,0-2h1a3,3,0,0,1,0,6v2A1,1,0,0,1,18,19Z"/>
            <Path class="cls-1" d="M6,16H5a3,3,0,0,1,0-6H6a1,1,0,0,1,0,2H5a1,1,0,0,0,0,2H6a1,1,0,0,1,0,2Z"/>
            <Circle class="cls-1" cx="10" cy="9" r="1"/>
            <Circle class="cls-1" cx="14" cy="9" r="1"/>
            <Path class="cls-1" d="M12,12h0a2,2,0,0,1,2,2v2a0,0,0,0,1,0,0H10a0,0,0,0,1,0,0V14A2,2,0,0,1,12,12Z"/>
        </Svg>)

}