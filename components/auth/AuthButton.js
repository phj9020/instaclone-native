import React from 'react';
import styled from 'styled-components/native';
import { Platform } from 'react-native';

const Button = styled.TouchableOpacity`
    width: 100%;
    background-color: ${Platform.OS === "web" ? "#0095f6" : props => props.theme.accent.backgroundColor};
    padding: 15px 15px;
    border-radius: 5px;
    opacity: ${props => props.disabled ? "0.5" : "1"};
`

const ButtonText = styled.Text`
    color: ${Platform.OS === "web" ? "white" : props => props.theme.colors.color};
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
