import React from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import styled from 'styled-components/native';

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
    margin-bottom: 50px;
`

function AuthLayout({children}) {
    const dismissKeyboard = () => {
        Keyboard.dismiss();
    }
    return (
        <TouchableWithoutFeedback style={{flex: 1}} onPress={dismissKeyboard}>
            <Container>
                <Logo resizeMode="contain" source={require('../../assets/logo_white.png')} />
                {children}
            </Container>
        </TouchableWithoutFeedback>
    )
}

export default AuthLayout
