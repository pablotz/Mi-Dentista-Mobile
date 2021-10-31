import styled, {css} from 'styled-components/native';
import { TouchableWithoutFeedback } from 'react-native';

const Text = styled.Text` 
    ${props => props.bold ? "font-family: 'Poppins-Bold'" : "font-family: 'Poppins-Regular'" };
    font-size: ${ props => props.size};
    text-align: center;
`

export {
    Text
};