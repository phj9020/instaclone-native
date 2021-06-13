import React from 'react';
import styled from 'styled-components/native';
import { Platform, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

const Button = styled.TouchableOpacity`
    width: 100%;
    background-color: ${Platform.OS === "web" ? "#0095f6" : props => props.theme.accent.backgroundColor};
    padding: 15px 15px;
    border-radius: 5px;
    opacity: ${props => props.disabled ? "0.5" : "1"};
`

const ButtonText = styled.Text`
    color: ${Platform.OS === "web" ? "white" : props => props.theme.colors.color};
    font-weight: 600;
    font-size: 16px;
    text-align:center;
`

function AuthButton({onPress, disabled, text, loading}) {
    return (
        <Button disabled={disabled} onPress={onPress}>
            {loading ? <ActivityIndicator size="small" color="white" /> : <ButtonText>{text}</ButtonText>}
        </Button>
    )
}

AuthButton.propTypes = {
    onPress: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    loading: PropTypes.bool
}

export default AuthButton;
