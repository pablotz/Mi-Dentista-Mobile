import React from 'react';
import { Text } from '../../../styles/Typography/index'


export default function Typography(props) {

  return (
    <Text {...props}>{props.children}</Text>
  );
}
