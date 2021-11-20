import React from 'react';
import {Image} from 'react-native'
import { ButtonTouch, Text } from '../../../styles/IconTextButton/btnBg'


export default function ButtonTextIconBg(props) {

  return (
    <ButtonTouch {...props}>   
      <Text {...props}>
      {props.children}
      </Text> 
      {props.icon}    
    </ButtonTouch>
  
  );
}