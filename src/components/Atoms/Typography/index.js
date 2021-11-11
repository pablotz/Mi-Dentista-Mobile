import React from 'react';
import { Text } from '../../../styles/Typography/index'

/**
 * 
 * @param {bool} bold
 * @param {number} size
 * @returns 
 */

export default function Typography(props) {

  return (
    <Text {...props}>{props.children}</Text>
  );
}
