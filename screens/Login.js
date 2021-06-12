import React, {useRef, useEffect} from 'react';
import AuthLayout from '../components/auth/AuthLayout';
import AuthButton from '../components/auth/AuthButton';
import {TextInput} from '../components/auth/AuthShared';
import { useForm } from "react-hook-form";

function Login() {
    const { register, handleSubmit, setValue} = useForm();
    const passwordRef = useRef();

    const onNext = (nextOne) => {
        nextOne?.current?.focus();
    };
    const onValid = (data) => {
        console.log(data)
    };

    useEffect(()=> {
        register("username");
        register("password");
    },[register]);

    return (
        <AuthLayout>
            <TextInput 
                placeholder="Username" 
                placeholderTextColor="rgba(255,255,255, 0.8)" 
                returnKeyType="next"
                onChangeText={(text) => setValue("username", text)}
                autoCapitalize="none"
                onSubmitEditing={()=> onNext(passwordRef)}
            />
            <TextInput 
                ref={passwordRef}
                placeholder="Password" 
                placeholderTextColor="rgba(255,255,255, 0.8)" 
                returnKeyType="done"
                secureTextEntry={true}
                lastOne={true}
                onChangeText={(text) => setValue("password", text)}
                onSubmitEditing={handleSubmit(onValid)}
            />
            <AuthButton onPress={handleSubmit(onValid)} disabled={true} text="Log in" />
        </AuthLayout>
    )
}

export default Login;
