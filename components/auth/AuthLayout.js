import React from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import styled from 'styled-components/native';
import { KeyboardAvoidingView } from 'react-native';
import { Platform } from 'react-native';

const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.colors.backgroundColor};
    color: ${props => props.theme.colors.color};
    padding: 0px 40px;
`

const Logo = styled.Image`
    max-width: 70%;
    width: 100%;
    height: 100px;
    margin-bottom: 20px;
`

function AuthLayout({children}) {
    const dismissKeyboard = () => {
        Keyboard.dismiss();
    }
    return (
        <TouchableWithoutFeedback style={{flex: 1}} onPress={dismissKeyboard}>
            <Container>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
                    style={{width:"100%", alignItems: "center"}}>
                    <Logo resizeMode="contain" source={require('../../assets/logo_white.png')} />
                    {children}
                </KeyboardAvoidingView>
            </Container>
        </TouchableWithoutFeedback>
    )
}

export default AuthLayout
