import {gql} from "@apollo/client";

export const PHOTO_FRAGMENT = gql`
    fragment PhotoFragment on Photo {
        id
        file
        likes
        commentNumber
        isLiked
    }
`

export const COMMENT_FRAGMENT =gql`
    fragment CommentFragment on Comment {
        id
        payload
        isMine
        createdAt
        user {
            avatar
            username
        }
    }
`

export const USER_FRAGMENT = gql`
    fragment UserFragment on User {
        id
        username
        avatar
        isFollowing
        isMe
    }
`

export const FEED_PHOTO = gql`
    fragment FeedPhoto on Photo {
        ...PhotoFragment
            user {
                id
                username
                avatar
            }
            caption
            createdAt
            isMine
    }
    ${PHOTO_FRAGMENT}
`

export const ROOM_FRAGMENT = gql`
    fragment RoomFragment on Room {
        id
        users{
            avatar
            username
        }
        unreadTotal
        updatedAt
    }
`