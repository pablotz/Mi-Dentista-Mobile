import React from 'react';
import Svg, {Path,Line,Polyline,G} from 'react-native-svg';

export default function Search({color,height,width}) {
  
    return (  
        <Svg height={height} width={width}viewBox="0 0 24 24" fill="none">
            <Path 
            d="M11.5 21.75c-5.65 0-10.25-4.6-10.25-10.25S5.85 1.25 11.5 1.25s10.25 4.6 10.25 10.25-4.6 10.25-10.25 10.25Zm0-19c-4.83 0-8.75 3.93-8.75 8.75s3.92 8.75 8.75 8.75 8.75-3.93 8.75-8.75-3.92-8.75-8.75-8.75ZM22 22.751c-.19 0-.38-.07-.53-.22l-2-2a.754.754 0 0 1 0-1.06c.29-.29.77-.29 1.06 0l2 2c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22Z" 
            stroke={color}
            fill={color}
            >
            </Path>
        </Svg>
  );
}