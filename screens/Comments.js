import React from 'react';
import { Text, View } from 'react-native';
import DismissKeyboard from '../components/DismissKeyboard';
import styled from 'styled-components/native';
import { KeyboardAvoidingView, Platform, FlatList } from 'react-native';

const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: ${Platform.OS === "web" ? "black" : props => props.theme.boxColor.backgroundColor};
    color: ${Platform.OS === "web" ? "white" : props => props.theme.boxColor.color};
    padding: 0px 40px;
`

function Comments() {
    return (
        <DismissKeyboard>
            <Container>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
                    style={{width:"100%", alignItems: "center"}}>
                    <FlatList />
                </KeyboardAvoidingView>
            </Container>
        </DismissKeyboard>
    )
}

export default Comments;
