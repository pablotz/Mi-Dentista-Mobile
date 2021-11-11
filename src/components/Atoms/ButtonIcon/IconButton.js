import React from 'react';
import {Image} from 'react-native'
import { ButtonTouch } from '../../../styles/IconButton/index'


export default function Button(props) {

  return (
    <ButtonTouch {...props}>   
        {props.icon}     
    </ButtonTouch>
  );
}