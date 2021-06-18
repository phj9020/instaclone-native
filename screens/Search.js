import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import { TouchableOpacity,Text, View, TextInput } from 'react-native';
import styled from 'styled-components/native';
import DismissKeyboard from '../components/DismissKeyboard';

const Input = styled.TextInput``

function Search({navigation}) {
    const {setValue, register, watch} = useForm()

    const SearchBox = () => (
        <Input 
            style={{backgroundColor:"white"}} 
            placeholderTextColor="black" 
            placeholder="search photos"
            autoCapitalize="none"
            // for android
            returnKeyLabel="Search"
            // for ios
            returnkeyType="Search"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) => setValue("keyword", text)}
        />
    );

    useEffect(() => {
        navigation.setOptions({
            headerTitle: SearchBox,
        });

        register("keyword")
    },[])

    console.log(watch());
    return (
        <DismissKeyboard>
            <View style={{backgroundColor: "black", flex: 1, alignItems: "center", justifyContent: "center"}}>
                <Text style={{color: "white"}}>search</Text>
                <TouchableOpacity onPress={()=> navigation.navigate("Photo")}>
                    <Text style={{color: "white"}} >go to Photo</Text>
                </TouchableOpacity>
            </View>
        </DismissKeyboard>
    )
}

export default Search
