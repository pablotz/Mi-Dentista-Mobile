import React from 'react';
import {CheckBox} from 'react-native'
import { Text } from '../../../styles/CheckBox/index'


export default function CheckBoxTxt(props) {

  return (
    <CheckBox {...props}>
        <Text {...props}>{props.children}</Text>
    </CheckBox>
  );
}