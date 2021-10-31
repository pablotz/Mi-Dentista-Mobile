import React from 'react';
import {Image} from 'react-native'
import { ButtonTouch, Text } from '../../../styles/Button/index'


export default function Button(props) {

  return (
    <ButtonTouch {...props}>
        <Text {...props}>{props.children}</Text>
    </ButtonTouch>
  );
}