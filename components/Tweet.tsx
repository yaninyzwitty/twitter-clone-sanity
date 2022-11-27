import React, { useEffect, useState } from 'react'
import { Comment, CommentBody, Tweet } from '../typings'
import TimeAgo from "react-timeago"
import { ArrowsRightLeftIcon, ArrowUpTrayIcon, ChatBubbleLeftRightIcon, HeartIcon } from '@heroicons/react/24/outline'
import { fetchComments } from '../utils/fetchComments'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

type Props = {
  tweets: Tweet
}

function Tweet({ tweets }: Props) {
  const [comments, setComments ] = useState<Comment[]>([]);
  const [commentBoxOpen, setCommentBoxOpen ] = useState<boolean>(false);
  const [input,setInput ] = useState<string>('')
  const { data: session } = useSession();

// for refreshing
    const refreshComments = async () => {
      const comments: Comment[] = await fetchComments(tweets._id)
      setComments(comments)
    }


    const postComment = async () => {
      const commentInfo: CommentBody = {
        comment: input,
        tweetId: tweets._id,
        username: session?.user?.name || 'Unkown user',
        profileImage: session?.user?.image || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      }
      // making a post req to rhe backend
      const result = await fetch(`/api/addTweet`, {
        body: JSON.stringify(commentInfo),
        method: 'POST',
      })
  
      toast('Comment Updated...', {
        icon: '🚀👨‍🎤'
      })
      
    


    }
   

   
  useEffect(() => {
    refreshComments();

  }, [])
  // console.log(comments)
  
  // console.log(tweets)
  const handleSubmit = async ( e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // make the post message functionality...
    postComment();
    setInput("");
    setCommentBoxOpen(false);
    refreshComments();



  }
  return (
    <div className='flex flex-col space-x-3 border-y p-5 border-gray-100'>
      <div className='flex space-x-3'><img
      className='h-10 w-10 rounded-full object-cover' 
      src={tweets.profileImage} alt="" />
      <div>
        <div className='flex items-center space-x-1'>
          <p className='mr-1 font-bold'>{tweets.username}</p>
          <p className='hidden text-sm text-gray-500 sm:inline'>@{tweets.username.replace(/\s/g,'').toLocaleLowerCase() }.</p>
        <TimeAgo 
        className="text-sm text-gray-400"
        date={tweets._createdAt} />
        </div>
        <p className='pt-1'>{tweets.text}</p>
        {tweets?.image && (
          <img 
          className='m-5 ml-0 mb-1 max-h-60 h-25 w-25 rounded-lg object-cover shadow-sm'
          
          src={tweets.image} alt="" />
        )}

      </div>
      
      </div>
      <div className='flex mb-1 justify-between'>
        <div 
         onClick={() => session && setCommentBoxOpen(!commentBoxOpen)}
        className='flex cursor-pointer items-center space-x-3 text-gray-400'>
          <ChatBubbleLeftRightIcon
         
           className='w-5 h-5'/>
          <p>{comments.length}</p>
        </div>
        <div className='flex cursor-pointer items-center space-x-3 text-gray-400'>
          <ArrowsRightLeftIcon className='w-5 h-5'/>
        </div>
        <div className='flex cursor-pointer items-center space-x-3 text-gray-400'>
          <HeartIcon className='w-5 h-5'/>
        </div>
        <div className='flex cursor-pointer items-center space-x-3 text-gray-400'>
          <ArrowUpTrayIcon className='w-5 h-5'/>
        </div>

      </div>
      {/* comments */}
      {/* comment--box */}

      {commentBoxOpen && (
        <form onSubmit={handleSubmit} className='mt-3 flex space-x-3'>
          <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Your comment here" className='flex-1 rounded-lg bg-gray-100 p-2 outline-none' />
          <button 
          disabled={!input}
          className='text-twitter disabled:text-gray-200'>post</button>


        </form>
      )}
      {comments.length > 0 && (
        <div className='my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-top border-gray-100 p-5'>
          {comments.map((comment) => (
            <div key={comment._id} className="relative flex space-x-2">
              {/* <hr className='absolute left-5 top-10 h-8 border-x border-twitter/30'/> */}
              <img 
              className='mt-2 h-7 w-7 rounded-full object-cover'
              src={comment.profileImage} alt="" />
              <div>
                <div className='flex items-center space-x-1'>
                  <p className='mr-1 font-bold'>{comment.username}</p>
                  <p className='hidden text-sm text-gray-500 sm:inline'>@{comment.username.replace(/\s/g,'').toLocaleLowerCase() }</p>
                <TimeAgo 
                date={comment._createdAt} className="text-sm text-gray-400" /> 
                </div>
              <p>{comment.comment}</p>
              </div>

            </div>
          ))}
        </div>
      )}

      
     
     
      
    </div>
  )
}

export default Tweet