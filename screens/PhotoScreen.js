import React, {useState} from 'react';
import styled from 'styled-components/native';
import {gql, useQuery} from '@apollo/client';
import { PHOTO_FRAGMENT, COMMENT_FRAGMENT } from '../fragments';
import Photo from '../components/Photo';
import {useWindowDimensions, RefreshControl} from 'react-native';
import ScreenLayout from '../components/ScreenLayout';

const ScrollViewTag = styled.ScrollView`
    background-color:${props => props.theme.boxColor.backgroundColor};
    height: ${props => props.height}px;
`

const SEE_PHOTO_QUERY = gql`
    query seePhoto($id: Int!) {
        seePhoto(id: $id) {
            ...PhotoFragment
            user {
                id
                username
                avatar
            }
            caption
            comments {
                ...CommentFragment
            }
        }
    }
    ${PHOTO_FRAGMENT}
    ${COMMENT_FRAGMENT}
`

function PhotoScreen({route, navigation}) {
    const [refresh, setRefresh] = useState(false);
    const { params : {photoId}} = route;
    const {width, height} = useWindowDimensions();
    const {data, loading, refetch} = useQuery(SEE_PHOTO_QUERY, {
        variables: {
            id: photoId
        }
    })
    console.log(data);

    const refreshToRefetch = async()=> {
        setRefresh(true);
        await refetch();
        setRefresh(false);
    };

    return (
        <ScreenLayout loading={loading}>
            <ScrollViewTag 
                height={height}
                refreshControl={
                    <RefreshControl
                        refreshing={refresh}
                        onRefresh={refreshToRefetch}
                    />
                }
            >
                <Photo
                    {...data?.seePhoto}
                    isFullView={true}
                />
            </ScrollViewTag>
        </ScreenLayout>
    )
}

export default PhotoScreen;
