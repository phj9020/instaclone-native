import React from 'react';
import styled from 'styled-components/native';
import AuthButton from '../components/auth/AuthButton';
import AuthLayout from '../components/auth/AuthLayout';
import { TextInput } from 'react-native';


function CreateAccount({navigation}) {
    const createAccount = ()=>{

    };
    return (
        <AuthLayout>
            <TextInput 
            placeholder="First Name" 
            placeholderTextColor="gray" 
            returnKeyType="next"
            style={{backgroundColor:"white", width:"100%"}} />
            <TextInput 
            placeholder="Last Name" 
            placeholderTextColor="gray" 
            returnKeyType="next"
            style={{backgroundColor:"white", width:"100%"}} />
            <TextInput 
            placeholder="Username" 
            placeholderTextColor="gray" 
            returnKeyType="next"
            style={{backgroundColor:"white", width:"100%"}} />
            <TextInput 
            placeholder="Email" 
            placeholderTextColor="gray" 
            returnKeyType="next"
            keyboardType="email-address"
            style={{backgroundColor:"white", width:"100%"}} />
            <TextInput 
            placeholder="Password" 
            placeholderTextColor="gray" 
            returnKeyType="done"
            secureTextEntry={true}
            style={{backgroundColor:"white", width:"100%"}} />
            <AuthButton text="Create Account" disabled={true} onPress={createAccount} />
        </AuthLayout>
    )
}

export default CreateAccount;
