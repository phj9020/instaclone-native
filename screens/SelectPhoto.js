import React from 'react';
import styled from 'styled-components/native';
import {View, Text} from 'react-native';

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

function SelectPhoto() {
    return (
        <Container>
            <Top>

            </Top>
            <Bottom>

            </Bottom>
        </Container>
    )
}

export default SelectPhoto;
