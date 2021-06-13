import React,{useRef, useEffect} from 'react';
import AuthButton from '../components/auth/AuthButton';
import AuthLayout from '../components/auth/AuthLayout';
import {TextInput} from '../components/auth/AuthShared';
import { useForm } from "react-hook-form";

function CreateAccount({navigation}) {
    const {register, handleSubmit, setValue} = useForm();
    const lastNameRef = useRef();
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const onNext = (nextOne)=> {
        // console.log(lastNameRef.current)
        nextOne?.current?.focus();
    };

    const onValid = (data) => {
        console.log(data)
    };

    useEffect(() => {
        register("firstName", {
            required: "Firstname is required",
        });
        register("lastName");
        register("username", {
            required: "username is required",
            minLength: {
                value: 6,
                message: "username should be longer than 6 characters"
            },
        });
        register("email", {
            required: "email is required",
        });
        register("password", {
            required: "password is required",
            minLength: {
                value: 3,
                message: "Password should be longer than 3 characters"
            },
        });
    }, [register])
    return (
        <AuthLayout>
                <TextInput 
                placeholder="First Name" 
                placeholderTextColor="rgba(255,255,255, 0.8)"
                returnKeyType="next"
                onSubmitEditing={()=> onNext(lastNameRef)}
                onChangeText={(text) => setValue("firstName", text)}
                />
                <TextInput 
                ref={lastNameRef}
                placeholder="Last Name" 
                placeholderTextColor="rgba(255,255,255, 0.8)" 
                returnKeyType="next"
                onSubmitEditing={()=> onNext(usernameRef)}
                onChangeText={(text) => setValue("lastName", text)} 
                />
                <TextInput 
                ref={usernameRef}
                autoCapitalize="none"
                placeholder="Username" 
                placeholderTextColor="rgba(255,255,255, 0.8)" 
                returnKeyType="next"
                onSubmitEditing={()=> onNext(emailRef)}
                onChangeText={(text) => setValue("username", text)}
                />
                <TextInput 
                ref={emailRef}
                placeholder="Email" 
                placeholderTextColor="rgba(255,255,255, 0.8)" 
                returnKeyType="next"
                keyboardType="email-address"
                onSubmitEditing={()=> onNext(passwordRef)}
                onChangeText={(text) => setValue("email", text)}
                />
                <TextInput 
                ref={passwordRef}
                placeholder="Password" 
                placeholderTextColor="rgba(255,255,255, 0.8)" 
                returnKeyType="done"
                secureTextEntry={true}
                onSubmitEditing={handleSubmit(onValid)}
                onChangeText={(text) => setValue("password", text)}
                lastOne={true}
                />
                <AuthButton text="Create Account" disabled={true}  onPress={handleSubmit(onValid)} />
        </AuthLayout>
    )
}

export default CreateAccount;
