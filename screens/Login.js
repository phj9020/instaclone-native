import React, {useRef, useEffect,useState} from 'react';
import AuthLayout from '../components/auth/AuthLayout';
import AuthButton from '../components/auth/AuthButton';
import {TextInput} from '../components/auth/AuthShared';
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { logUserIn } from '../apollo';
import ErrorText from '../components/auth/ErrorText';

const LOGIN_MUTATION = gql`
    mutation login($username:String!, $password:String!) {
        login(username:$username, password:$password) {
            ok
            token
            error
        }
    }
`;

function Login({route}) {
    // console.log(route)
    const { register, handleSubmit, setValue, watch } = useForm({
        defaultValues : {
            username: route?.params?.username,
            password: route?.params?.password
        }
    });
    const passwordRef = useRef();
    const [error, setError] = useState();
    
    const [login, {loading}] = useMutation(LOGIN_MUTATION, {
        onCompleted: async(data)=> {
            const {login : {error, ok, token}} = data;
            if(!ok) {
                setError(error);
            } else {
                await logUserIn(token);
            }
            
        }
    });

    const onNext = (nextOne) => {
        nextOne?.current?.focus();
    };
    const onValid = (data) => {
        const {username, password} = data;
        if(!loading) {
            login({
                variables : {
                    username, password
                }
            })
        }

    };
    const clearLoginError = ()=> {
        setError("")
    };
    useEffect(()=> {
        register("username", {
            required: true
        });
        register("password", {
            required: true
        });
    },[register]);

    return (
        <AuthLayout>
            {error ? <ErrorText>{error}</ErrorText> : null}
            <TextInput 
                value={watch("username")}
                placeholder="Username" 
                placeholderTextColor="rgba(255,255,255, 0.8)" 
                returnKeyType="next"
                onChangeText={(text) => setValue("username", text)}
                autoCapitalize="none"
                onSubmitEditing={()=> onNext(passwordRef)}
                onFocus={clearLoginError}
            />
            <TextInput 
                value={watch("password")}
                ref={passwordRef}
                placeholder="Password" 
                placeholderTextColor="rgba(255,255,255, 0.8)" 
                returnKeyType="done"
                secureTextEntry={true}
                lastOne={true}
                onChangeText={(text) => setValue("password", text)}
                onSubmitEditing={handleSubmit(onValid)}
                onFocus={clearLoginError}
            />
            <AuthButton 
                onPress={handleSubmit(onValid)} 
                loading={loading}
                disabled={!watch("username") || !watch("password")} 
                text="Log in" />
        </AuthLayout>
    )
}

export default Login;
