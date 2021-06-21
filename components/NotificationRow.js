import React from 'react';
import styled from 'styled-components/native';
import {View} from 'react-native';
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons'; 

const Container = styled.View`
    background-color: ${props => props.theme.boxColor.backgroundColor};
    padding: 10px 15px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const DividerView = styled.View`
    flex-direction: row;
`
const Text = styled.Text`
    color: ${props => props.theme.boxColor.color};
    margin-right: 10px;
`
const DeleteButton = styled.TouchableOpacity``

const IoniconsStyle = styled(Ionicons)`
    color: red;
`

function NotificationRow({payload, createdAt}) {
    return (
        <Container>
            <Text>{payload}</Text>
            <DividerView>
                <Text>{moment.unix(createdAt / 1000).endOf('day').fromNow()}</Text>
                <DeleteButton>
                    <IoniconsStyle name="remove-circle-outline" size={24}  />
                </DeleteButton>
            </DividerView>
        </Container>
    )
}

export default NotificationRow
