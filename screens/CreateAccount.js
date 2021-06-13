import React,{useRef, useEffect, useState} from 'react';
import AuthButton from '../components/auth/AuthButton';
import AuthLayout from '../components/auth/AuthLayout';
import {TextInput} from '../components/auth/AuthShared';
import { useForm } from "react-hook-form";
import ErrorText from '../components/auth/ErrorText';
import { gql, useMutation } from "@apollo/client";

const CREATE_ACCOUNT_MUTATION = gql`
    mutation createAccount(
        $firstName: String!, 
        $lastName: String, 
        $username: String!,
        $email: String!,
        $password: String!,
        ) {
            createAccount(
                firstName:$firstName, 
                lastName:$lastName, 
                username:$username, 
                email:$email, 
                password:$password) {
                    ok
                    error
                    id
                }
        }
`

function CreateAccount({navigation}) {
    const {register, handleSubmit, setValue, getValues, watch} = useForm();
    const [error, setError] = useState();
    const [createAccount, {loading}] = useMutation(CREATE_ACCOUNT_MUTATION, {
        onCompleted: (data) => {
            const {createAccount :{ok, error}} = data;
            if(!ok) {
                setError(error);
            } else {
                const {username, password} = getValues();
                // send user to login page
                navigation.navigate("Login", {
                    username: username,
                    password: password,
                });

            }
        }
    })
    const lastNameRef = useRef();
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const onNext = (nextOne)=> {
        // console.log(lastNameRef.current)
        nextOne?.current?.focus();
    };

    const onValid = (data) => {
        if(!loading) {
            createAccount({
                variables: {
                    ...data
                }
            })
        }
    };

    useEffect(() => {
        register("firstName", {
            required: true,
        });
        register("lastName");
        register("username", {
            required: true,
            minLength: {
                value: 6,
            },
        });
        register("email", {
            required: true,
        });
        register("password", {
            required: true,
            minLength: {
                value: 3,
            },
        });
    }, [register]);

    return (
        <AuthLayout>
                {error ? <ErrorText>{error}</ErrorText> : null }
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
                <AuthButton text="Create Account" 
                    disabled={!watch("firstName") || !watch("username") || !watch("email") || !watch("password")}  
                    loading={loading}
                    onPress={handleSubmit(onValid)} />
        </AuthLayout>
    )
}

export default CreateAccount;
