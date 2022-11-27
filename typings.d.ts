export interface Tweet extends TweetBody {
    _id: string
    _createdAt: string
    _updatedAt: string
    _rev: string
    _type: "tweet"
    blockTweet: boolean

}
// comes from sanity...


export type TweetBody = {
    text: string,
    username: string,
    profileImage: string,
    image?: string
}


export type CommentBody = {
    comment: string,
    tweetId: string,
    username: string,
    profileImage?: string,
    
}

export interface Comment extends CommentBody {
    _createdAt: string,
    _id: string,
    _rev: string,
    _updatedAt: string,
    _type: "comment"
    tweet: {
        _ref: string
        _type: 'reference'
    }

}