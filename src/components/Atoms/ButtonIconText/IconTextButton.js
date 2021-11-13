import React from 'react';
import {Image} from 'react-native'
import { ButtonTouch, Text } from '../../../styles/IconTextButton/index'


export default function ButtonTextIcon(props) {

  return (
    <ButtonTouch {...props}>   
    <Text {...props}>
    {props.children}
    </Text> 
    {props.icon}    
    </ButtonTouch>
  );
}