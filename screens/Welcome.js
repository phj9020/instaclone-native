import React from 'react';
import styled from 'styled-components/native';
import AuthButton from '../components/auth/AuthButton';
import AuthLayout from '../components/auth/AuthLayout';
import { Platform } from 'react-native';


const Login = styled.TouchableOpacity`
    width: 100%;
    padding: 13px 15px;
    border: 1px solid ${Platform.OS === "web" ? "#0095f6" :props => props.theme.accent.backgroundColor};
    border-radius: 5px;
    margin-top: 20px;
`

const LoginLink = styled.Text`
    color: ${Platform.OS === "web" ? "#0095f6" : props => props.theme.accent.backgroundColor};
    font-weight: 600;
    font-size: 16px;
    text-align: center;
`

function Welcome({navigation}) {
    const goToCreateAccount = ()=> {
        navigation.navigate("CreateAccount");
    };
    const goToLogIn = () => {
        navigation.navigate("Login")
    }
    return (
        <AuthLayout>
            <AuthButton text="Create New Account" disabled={false} onPress={goToCreateAccount}/>
            <Login onPress={goToLogIn}>
                <LoginLink>Log in</LoginLink>
            </Login>
        </AuthLayout>
    )
}


export default Welcome;
