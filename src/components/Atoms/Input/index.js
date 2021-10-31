import React from 'react';
import {Image, View} from 'react-native';
import { TextInput } from '../../../styles/Input/index'


export default function Input(props) {

  return (
    <View>
    <TextInput {...props}>
      {props.children}
    </TextInput>
    </View>
  );
}
