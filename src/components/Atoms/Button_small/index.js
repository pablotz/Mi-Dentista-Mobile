import React from 'react';
import {Image} from 'react-native'
import { ButtonTouch, Text } from '../../../styles/Button/btnSmall'


export default function ButtonSmall(props) {

  return (
    <ButtonTouch {...props}>
        <Text {...props}>{props.children}</Text>
    </ButtonTouch>
  );
}