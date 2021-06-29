import React from 'react';
import styled from 'styled-components/native';
import {View} from 'react-native';
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons'; 
import {gql, useMutation} from '@apollo/client';

const DELETE_NOTIFICATION = gql`
    mutation deleteNotification($id: Int!) {
        deleteNotification(id: $id) {
            ok
            error
        }
    }
`

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

function NotificationRow({id, payload, createdAt}) {

    const deleteNotificationUpdate = (cache, result) => {
        const {data : {deleteNotification : {ok}}} = result; 

        if(ok) {
            const fragmentId = `Notification:${id}`;

            cache.evict({
                id: fragmentId
            });

            cache.modify({
                id: fragmentId,
                fields: {
                    seeNotification(prev) {
                        return [...prev]; 
                    }
                }
            })
        }

    }

    const [deleteNotification] = useMutation(DELETE_NOTIFICATION, {
        update: deleteNotificationUpdate,
    });

    const deleteNoti = (selectedId)=> {
        deleteNotification({
            variables: {
                id: selectedId
            }
        });
    };
    
    return (
        <Container id={id}>
            <Text>{payload}</Text>
            <DividerView>
                <Text>{moment.unix(createdAt / 1000).endOf('day').fromNow()}</Text>
                <DeleteButton onPress={()=> deleteNoti(id)}>
                    <IoniconsStyle name="remove-circle-outline" size={24}  />
                </DeleteButton>
            </DividerView>
        </Container>
    )
}

export default NotificationRow
