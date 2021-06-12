import React,{useRef} from 'react';
import AuthButton from '../components/auth/AuthButton';
import AuthLayout from '../components/auth/AuthLayout';
import {TextInput} from '../components/auth/AuthShared';

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
                <TextInput 
                placeholder="First Name" 
                placeholderTextColor="rgba(255,255,255, 0.8)"
                returnKeyType="next"
                onSubmitEditing={()=> onNext(lastNameRef)}
                />
                <TextInput 
                ref={lastNameRef}
                placeholder="Last Name" 
                placeholderTextColor="rgba(255,255,255, 0.8)" 
                returnKeyType="next"
                onSubmitEditing={()=> onNext(usernameRef)}
                />
                <TextInput 
                ref={usernameRef}
                placeholder="Username" 
                placeholderTextColor="rgba(255,255,255, 0.8)" 
                returnKeyType="next"
                onSubmitEditing={()=> onNext(emailRef)}
                />
                <TextInput 
                ref={emailRef}
                placeholder="Email" 
                placeholderTextColor="rgba(255,255,255, 0.8)" 
                returnKeyType="next"
                keyboardType="email-address"
                onSubmitEditing={()=> onNext(passwordRef)}
                />
                <TextInput 
                ref={passwordRef}
                placeholder="Password" 
                placeholderTextColor="rgba(255,255,255, 0.8)" 
                returnKeyType="done"
                secureTextEntry={true}
                onSubmitEditing={onDone}
                lastOne={true}
                />
                <AuthButton text="Create Account" disabled={true} onPress={createAccount} />
        </AuthLayout>
    )
}

export default CreateAccount;
