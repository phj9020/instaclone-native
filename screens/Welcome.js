import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.colors.backgroundColor};
    color: ${props => props.theme.colors.color};
`

const Logo = styled.Image`
    max-width: 50%;
    height: 100px;
    margin-bottom: 50px;
`

const CreateAccount = styled.View`
    background-color: ${props => props.theme.accent.backgroundColor};
    padding: 7px 15px;
    border-radius: 5px;
`

const CreateAccountText = styled.Text`
    color: ${props => props.theme.colors.color};
    font-weight: 600;
    font-size: 16px;
`

const LoginLink = styled.Text`
    color: ${props => props.theme.accent.backgroundColor};
    margin-top: 20px;
    font-weight: 600;
    font-size: 16px;
`

function Welcome({navigation}) {
    const goToCreateAccount = ()=> {
        navigation.navigate("CreateAccount");
    };
    const goToLogIn = () => {
        navigation.navigate("Login")
    }
    return (
        <Container> 
            <Logo resizeMode="contain" source={require("../assets/logo_white.png")} />
            <TouchableOpacity onPress={goToCreateAccount}>
                <CreateAccount>
                    <CreateAccountText>Create Account</CreateAccountText>
                </CreateAccount>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToLogIn}>
                <LoginLink>Log in</LoginLink>
            </TouchableOpacity>
        </Container>
    )
}


export default Welcome;
