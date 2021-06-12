import React from 'react';
import AuthLayout from '../components/auth/AuthLayout';
import AuthButton from '../components/auth/AuthButton';
import {TextInput} from '../components/auth/AuthShared';


function Login() {
    const completeLogin = () => {}
    return (
        <AuthLayout>
            <TextInput 
                placeholder="Username" 
                placeholderTextColor="rgba(255,255,255, 0.8)" 
                returnKeyType="next"
            />
            <TextInput 
                placeholder="Password" 
                placeholderTextColor="rgba(255,255,255, 0.8)" 
                returnKeyType="done"
                secureTextEntry={true}
                lastOne={true}
            />
            <AuthButton onPress={completeLogin} disabled={true} text="Log in" />
        </AuthLayout>
    )
}

export default Login;
