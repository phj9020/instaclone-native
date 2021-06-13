import React from 'react';
import styled from 'styled-components/native';
import {Text} from 'react-native';


const ErrorTextStyled = styled.Text`
    color: red;
    margin-bottom: 40px;
`


function ErrorText({children}) {
    return (
        <ErrorTextStyled>
            {children}
        </ErrorTextStyled>
    )
}

export default ErrorText
