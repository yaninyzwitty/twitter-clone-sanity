import { ArrowPathIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'
import { Tweet } from '../typings'
import { fetchTweets } from '../utils/fetchTweets'
import TweetComponent from './Tweet'
import TweetBox from './TweetBox'
import toast from "react-hot-toast"


type Props = {
  tweets: Tweet[]
}

function Feed({tweets: tweetProps}: Props) {
  const [tweets, setTweets]= useState<Tweet[]>(tweetProps)
  // console.log(tweets)

  const handleRefresh = async () => {
    const tweets = await fetchTweets()
    const refreshToast = toast.loading('refreshing')
    setTweets(tweets)
    toast.success('Feed updated successfully', {
      id: refreshToast
    })
  }
  return (
    <div className='col-span-7 border-x max-h-screen overflow-scroll scrollbar-hide lg:col-span-5'>
        <div className='flex items-center justify-between'>
            <h1 className='p-5 pb-0 text-xl font-bold'>Home</h1>
            <ArrowPathIcon 
            onClick={handleRefresh}
            className='h-8 w-8 cursor-pointer text-twitter mr-5 mt-5 transition-all duration-500 ease-out hover:rotate-180 active:scale-125'/>
        </div>
        {/* tweetbox */}
        <div>

        <TweetBox setTweets={setTweets} />
        </div>
        {/* feed */}
        <div>

          {tweets.map((tweet) => (
            <TweetComponent key={tweet._id} tweets={tweet}/>
          ))}
          
     
   
        </div>
        

    </div>
  )
}

export default Feed