import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {FlatList, Image, TouchableOpacity, useWindowDimensions} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { Ionicons } from '@expo/vector-icons';

const Container = styled.View`
    flex: 1;
    background-color: ${props => props.theme.boxColor.backgroundColor};
`

const Top = styled.View`
    flex: 1;
`

const Bottom = styled.View`
    flex: 1;
`

const ImageContainer = styled.TouchableOpacity`
`

const IconContainer = styled.View`
    position: absolute;
    left:2px;
    top:2px;
`

const HeaderRightText = styled.Text`
    color: ${props => props.theme.accent.backgroundColor};
    font-weight: bold;
    margin-right: 5px;
`

function SelectPhoto({navigation}) {
    const numColumns = 4;
    const {width, height} = useWindowDimensions();
    const [ok, setOk] = useState(false);
    const [photos, setPhotos] = useState([]);
    const [chosenPhoto, setChosenPhoto] = useState();

    const getPhotos = async() => {
        if(ok) {
            const {assets:photos} = await MediaLibrary.getAssetsAsync({
                first:200, 
                sortBy:MediaLibrary.SortBy.creationTime
            });
            setPhotos(photos);
            setChosenPhoto(photos[0]?.uri)
        }
    };
    
    const getPermission = async() => {
        const {status, canAskAgain}= await MediaLibrary.getPermissionsAsync();
        console.log(status);
        if(status === "denied" && canAskAgain) {
            const {status} = await MediaLibrary.requestPermissionsAsync();
            console.log(status);
            if(status !== "denied") {
                setOk(true);
            };
        } 
        else if(status !== "denied") {
            setOk(true);
        }
    };
    // console.log(photos);

    useEffect(() => {
        getPermission();
        getPhotos();
    },[ok]);

    
    const HeaderRight = () => (
        <TouchableOpacity onPress={()=> navigation.navigate("UploadForm", {file: chosenPhoto})} >
            <HeaderRightText>Next</HeaderRightText>
        </TouchableOpacity>
    )

    useEffect(() => {
        navigation.setOptions({
            headerRight: HeaderRight
        })
    },[chosenPhoto])

    const choosePhoto = (uri) => {
        setChosenPhoto(uri);
    };

    const renderItem = ({item}) => (
        <ImageContainer onPress={()=> choosePhoto(item.uri)}>
            <Image style={{width: width/numColumns, height: 100 }} source={{uri: item.uri}} />
            <IconContainer>
                <Ionicons name="checkmark-circle" size={18}  color={chosenPhoto === item.uri ? "#0095f6" : "white"} />
            </IconContainer>
        </ImageContainer>
    );
    
    return (
        <Container>
            <Top>
                {chosenPhoto !== "" ? 
                    <Image 
                        resizeMode="contain"
                        source={{uri: chosenPhoto}} 
                        style={{width, height: '100%'}}/>
                    :
                    null    
                }
            </Top>
            <Bottom>
                <FlatList 
                    numColumns={numColumns}
                    data={photos}
                    renderItem={renderItem}
                    keyExtractor={item => "" + item.id}
                />
            </Bottom>
        </Container>
    )
}

export default SelectPhoto;
