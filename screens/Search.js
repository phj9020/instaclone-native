import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import { ActivityIndicator, useWindowDimensions, FlatList } from 'react-native';
import styled from 'styled-components/native';
import DismissKeyboard from '../components/DismissKeyboard';
import {gql, useLazyQuery} from '@apollo/client';


const SearchTabContainer = styled.View`
    flex: 1;
    background-color: ${props => props.theme.boxColor.backgroundColor};
`

const MessageContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`

const MessageText = styled.Text`
    margin-top: 10px;
    color: ${props => props.theme.boxColor.color};
    font-weight: bold;
`

const Input = styled.TextInput`
    background-color: rgba(255,255,255, 1);
    padding: 5px 10px;
    border-radius: 10px;
    width: ${props => props.width / 1.5}px;
`

// render item style

const Touch = styled.TouchableOpacity``

const ResultImage = styled.Image`
    width: ${props => props.width}px;
    height: 140px;
`


const SEARCH_PHOTO_QUERY = gql`
    query searchPhoto($keyword: String!, $offset: Int!) {
        searchPhoto(keyword: $keyword, offset: $offset) {
            id
            file
        }
    }
`


function Search({navigation}) {
    const [refresh, setRefresh] = useState(false);
    const {setValue, register, handleSubmit, getValues} = useForm();
    const {width, height} = useWindowDimensions();
    const numberOfColumns = 3;
    // useLazyQuery for delay, which returns mutation type 
    const [startQueryFn, {loading, data, called, refetch, fetchMore}]= useLazyQuery(SEARCH_PHOTO_QUERY);

    console.log(data);
    const {keyword} = getValues();

    const onValid = (data)=>{
        startQueryFn({
            variables: {
                keyword: data.keyword,
                offset:0
            }
        });
    };

    const SearchBox = () => (
        <Input 
            width={width}
            placeholderTextColor="rgba(0,0,0,0.8)" 
            placeholder="search photos"
            autoCapitalize="none"
            // for android
            returnKeyLabel="Search"
            // for ios
            returnkeyType="Search"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) => setValue("keyword", text)}
            onSubmitEditing={handleSubmit(onValid)}
        />
    );

    useEffect(() => {
        navigation.setOptions({
            headerTitle: SearchBox,
        });

        register("keyword", {
            required: true,
            minLength: 3,
        })
    },[])

    const refreshToRefetch = async()=> {
        setRefresh(true);
        await refetch();
        setRefresh(false);
    }

    const renderItem = ({ item }) => (
            <Touch onPress={()=>navigation.navigate("Photo", {photoId : item.id})}>
                <ResultImage resizeMode="cover" width={width / numberOfColumns} source={{uri: item.file}}/>
            </Touch>
    )
    
    console.log(data?.searchPhoto?.length);

    return (
        <DismissKeyboard>
            <SearchTabContainer>
                {loading ? 
                <MessageContainer>
                    <ActivityIndicator size="large" color="#0000ff"/>
                    <MessageText>Searching...</MessageText>
                </MessageContainer>
                : 
                null
                }
                {!called ? 
                    <MessageContainer>
                        <MessageText>Search by Keyword..</MessageText>
                    </MessageContainer>
                    :
                    null
                }
                {data?.searchPhoto !== undefined ? 
                    (
                        data?.searchPhoto.length === 0 ? (
                            <MessageContainer>
                                <MessageText>Could Not Find Anything</MessageText>
                            </MessageContainer>
                        ) : 
                        (<FlatList 
                            onEndReachedThreshold={0.1}
                            onEndReached={()=> fetchMore({ 
                                variables: {
                                    keyword: keyword,
                                    offset: data?.searchPhoto?.length,
                                }
                            })}
                            refreshing={refresh}
                            onRefresh={refreshToRefetch}
                            numColumns={numberOfColumns}
                            data={data?.searchPhoto} 
                            keyExtractor={item => "" + item.id}
                            renderItem={renderItem}
                        /> )
                    ) : null
                }
            </SearchTabContainer>
        </DismissKeyboard>
    )
}

export default Search
