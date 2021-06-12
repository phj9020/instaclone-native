import React,{useRef} from 'react';
import styled from 'styled-components/native';
import AuthButton from '../components/auth/AuthButton';
import AuthLayout from '../components/auth/AuthLayout';
import { TextInput, KeyboardAvoidingView } from 'react-native';
import { Platform } from 'react-native';


function CreateAccount({navigation}) {
    const lastNameRef = useRef();
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const onNext = (nextOne)=> {
        // console.log(lastNameRef.current)
        nextOne?.current?.focus();
    };

    const onDone = () => {
        alert("Done")
    }
    const createAccount = ()=>{

    };
    return (
        <AuthLayout>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" && "padding"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
                style={{width:"100%"}}
            >
                <TextInput 
                placeholder="First Name" 
                placeholderTextColor="gray" 
                returnKeyType="next"
                style={{backgroundColor:"white", width:"100%"}} 
                onSubmitEditing={()=> onNext(lastNameRef)}
                />
                <TextInput 
                ref={lastNameRef}
                placeholder="Last Name" 
                placeholderTextColor="gray" 
                returnKeyType="next"
                style={{backgroundColor:"white", width:"100%"}} 
                onSubmitEditing={()=> onNext(usernameRef)}
                />
                <TextInput 
                ref={usernameRef}
                placeholder="Username" 
                placeholderTextColor="gray" 
                returnKeyType="next"
                style={{backgroundColor:"white", width:"100%"}} 
                onSubmitEditing={()=> onNext(emailRef)}
                />
                <TextInput 
                ref={emailRef}
                placeholder="Email" 
                placeholderTextColor="gray" 
                returnKeyType="next"
                keyboardType="email-address"
                style={{backgroundColor:"white", width:"100%"}} 
                onSubmitEditing={()=> onNext(passwordRef)}
                />
                <TextInput 
                ref={passwordRef}
                placeholder="Password" 
                placeholderTextColor="gray" 
                returnKeyType="done"
                secureTextEntry={true}
                style={{backgroundColor:"white", width:"100%"}} 
                onSubmitEditing={onDone}
                />
                <AuthButton text="Create Account" disabled={true} onPress={createAccount} />
            </KeyboardAvoidingView>
        </AuthLayout>
    )
}

export default CreateAccount;
