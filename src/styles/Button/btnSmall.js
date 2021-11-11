import styled, {css} from 'styled-components/native';
import { TouchableWithoutFeedback } from 'react-native';

const ButtonTouch = styled.TouchableOpacity` 
    height: 50px;
    width: 200px;
    background-color: #818181;
    border-radius: 15px;
    margin-top: 50px;
    justify-content: center;
    align-items: center;
`

const Text = styled.Text` 
    font-family: 'Poppins-ExtraBold';
    font-size: 17px;
    text-align: center;
    color: #fff;
`


export {
    ButtonTouch,
    Text
};