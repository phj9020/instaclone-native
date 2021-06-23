import React, {useState, useEffect} from 'react';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { Camera } from 'expo-camera';
import Slider from '@react-native-community/slider';
import {TouchableOpacity, StatusBar} from 'react-native';

const Container = styled.View`
    flex: 1;
    background-color: ${props => props.theme.boxColor.backgroundColor};
`

const Actions = styled.View`
    flex:0.3;
    background-color: black;
    align-items: center;
    justify-content: space-around;
`

const ButtonsContainer = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`

const TakePhotoBtn = styled.TouchableOpacity`
    width: 50px;
    height: 50px;
    background-color: rgba(255,255,255, 0.5);
    border-radius: 25px;
    border: 2px solid ${props => props.theme.colors.borderColor};
`

const ActionContainer = styled.View`
    flex-direction: row;
    align-items: center;
`

const SliderContainer = styled.View``

const CloseButton = styled.TouchableOpacity`
    position: absolute;
    left: 10px;
    top:10px;
`



function TakePhoto({navigation}) {
    const [ok, setOk] = useState(false);
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
    const [zoom, setZoom] = useState(0);
    const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);

    const getPermission = async() => {
        const {granted} = await Camera.requestPermissionsAsync();
            setOk(granted === true);
    };

    useEffect(() => {
        getPermission();
    }, []);

    const cameraFlip = ()=> {
        if(cameraType === Camera.Constants.Type.back) {
            setCameraType(Camera.Constants.Type.front);
        } else if (cameraType === Camera.Constants.Type.front) {
            setCameraType(Camera.Constants.Type.back);
        }
    };

    const onZoomValueChange = (e) => {
        setZoom(e);
    };

    const onFlashChange = () => {
        if(flashMode === Camera.Constants.FlashMode.off) {
            setFlashMode(Camera.Constants.FlashMode.on);
        } else if(flashMode === Camera.Constants.FlashMode.on){
            setFlashMode(Camera.Constants.FlashMode.auto);
        } else if(flashMode === Camera.Constants.FlashMode.auto) {
            setFlashMode(Camera.Constants.FlashMode.off)
        }
    };
    console.log(flashMode);
    return (
        <Container>
            <StatusBar hidden={true} />
            <Camera
                type={cameraType}
                style={{
                    flex:1,
                }}
                zoom={zoom}
                flashMode={flashMode}
            >
                <CloseButton onPress={()=> navigation.navigate("Tabs")}>
                    <Ionicons name="close" color="white" size={32} />
                </CloseButton>
            </Camera>
            <Actions>
                <SliderContainer>
                    <Slider 
                        style={{width: 200, height: 40}}
                        minimumValue={0}
                        maximumValue={1}
                        minimumTrackTintColor="#FFFFFF"
                        maximumTrackTintColor="rgba(255,255,255,0.5)"
                        onValueChange={onZoomValueChange}
                    />
                </SliderContainer>
                <ButtonsContainer>
                    <TakePhotoBtn />
                    <ActionContainer>
                        <TouchableOpacity onPress={onFlashChange}>
                            <Ionicons name={
                                flashMode === Camera.Constants.FlashMode.off ? "flash-off" :
                                flashMode === Camera.Constants.FlashMode.on ? "flash" : 
                                flashMode === Camera.Constants.FlashMode.auto ? "eye" : ""} size={22} color="white" 
                                style={{marginRight: 30}}
                                />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={cameraFlip}>
                            <Ionicons name={cameraType === Camera.Constants.Type.front ? "camera-reverse" : "camera"} size={30} color="white" />
                        </TouchableOpacity>
                    </ActionContainer>
                </ButtonsContainer>
            </Actions>
        </Container>
    )
}

export default TakePhoto;
