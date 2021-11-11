import React from 'react';
import {Image} from 'react-native'
import { ButtonTouch, Text } from '../../../styles/Button/btnRed'


export default function ButtonRed(props) {

  return (
    <ButtonTouch {...props}>
        <Text {...props}>{props.children}</Text>
    </ButtonTouch>
  );
}