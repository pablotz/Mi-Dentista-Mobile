import styled, { css } from 'styled-components/native';
import { TouchableWithoutFeedback } from 'react-native';

const SIZE = 48;
const DEF_COLOR = '#D6D6D6';
const DEF_COLOR_FONT = '#787878';


const ButtonTouch = styled.TouchableOpacity ` 
    height: ${SIZE}px;
    width: ${SIZE}px;
    background-color: ${DEF_COLOR};
    border-radius: 15px;    

    display: flex;
    justify-content: center;
    align-items: center;    
`

const IconStyle = ` 
    color: ${DEF_COLOR_FONT}
    height: ${SIZE/2}px;
    width: ${SIZE/2}px;
    object-fit: contain;
`


export {
    ButtonTouch,
    IconStyle
};