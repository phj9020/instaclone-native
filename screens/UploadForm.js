import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import {View, Text, TouchableOpacity} from 'react-native';


const HeaderRightText = styled.Text`
    color: ${props => props.theme.accent.backgroundColor};
    font-weight: bold;
    margin-right: 5px;
`

function UploadForm({navigation, route}) {
    const {file} = route?.params;
    console.log(route);

    const HeaderRight = () => (
        <TouchableOpacity>
            <HeaderRightText>Upload</HeaderRightText>
        </TouchableOpacity>
    )

    useEffect(() => {
        navigation.setOptions({
            headerRight: HeaderRight
        });
    },[])

    return (
        <View>
            <Text>Upload</Text>
        </View>
    )
}

export default UploadForm;
