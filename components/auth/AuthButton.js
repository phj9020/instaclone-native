import React from 'react';
import styled from 'styled-components/native';

const Button = styled.TouchableOpacity`
    width: 100%;
    background-color: ${props => props.theme.accent.backgroundColor};
    padding: 13px 15px;
    border-radius: 5px;
    opacity: ${props => props.disabled ? "0.5" : "1"};
`

const ButtonText = styled.Text`
    color: ${props => props.theme.colors.color};
    font-weight: 600;
    font-size: 16px;
    text-align:center;
`

function AuthButton({onPress, disabled, text}) {
    return (
        <Button disabled={disabled} onPress={onPress}>
            <ButtonText>{text}</ButtonText>
        </Button>
    )
}

export default AuthButton;
