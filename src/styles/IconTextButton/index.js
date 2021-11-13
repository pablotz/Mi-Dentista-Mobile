import styled, { css } from 'styled-components/native';
import { TouchableWithoutFeedback } from 'react-native';

const SIZE = 48;
const DEF_COLOR = '#D6D6D6';
const DEF_COLOR_FONT = '#787878';

const ButtonTouch = styled.TouchableOpacity` 
    height: 50px;
    width: 325px;
    background-color: #E3E3E3;
    border-radius: 15px;
    margin-top: 50px
    justify-content: space-evenly;
    display: flex;
    flex-direction: row;
    align-items: center;
`

const Text = styled.Text` 
    font-family: 'Roboto-Medium';
    font-size: 17px;
    text-align: center;
    color: #353535;
`

const IconStyle = ` 
    color: ${DEF_COLOR_FONT}
    height: ${SIZE/2}px;
    width: ${SIZE/2}px;
    object-fit: contain;
`


export {
    ButtonTouch,
    IconStyle,
    Text
};