import React from 'react';
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
    return (
        <Container>
            <Logo resizeMode="contain" source={require('../../assets/logo_white.png')} />
            {children}
        </Container>
    )
}

export default AuthLayout
