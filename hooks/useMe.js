import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { isLoggedInVar, logUserOut } from "../apollo";
import { PHOTO_FRAGMENT } from "../fragments";

// 2. make query 
const ME_QUERY = gql`
    query me {
        me {
            id
            firstName
            lastName
            username
            bio
            avatar
            photos(page: 1) {
                ...PhotoFragment
            }
            isMe
            totalFollowings
            totalFollowers
        }
    }
    ${PHOTO_FRAGMENT}
`


function useMe(){
    // 1. check if user logged in
    const hasToken = useReactiveVar(isLoggedInVar);

    // skip this query if user is not logged in with localStorage Token
    const {data, loading, refetch} = useQuery(ME_QUERY, {
        skip: !hasToken
    });
    // console.log(data);
    useEffect(()=> {
        if(data?.me === null) {
            console.log("There is a token on localStorage but not working on back-end");
            logUserOut();
        }
    },[data])

    return {
        data: data,
        loading: loading,
        refetch: refetch
    };
}

export default useMe;