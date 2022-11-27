import { CalendarDaysIcon, FaceSmileIcon, MagnifyingGlassCircleIcon, MapPinIcon, PhotoIcon } from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react';
import Image from 'next/image'
import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { Tweet, TweetBody } from '../typings';
import { fetchTweets } from '../utils/fetchTweets';

type Props = {
  setTweets: Dispatch<SetStateAction<Tweet[]>>
}

function TweetBox({setTweets}: Props) {

  const [input, setInput ] = useState<string>("");
  const { data: session } = useSession();
  const [image, setImage ] = useState<string>("");
  const [imageBox, setImageBox ] = useState<boolean>(false);
  const imageRef = useRef<HTMLInputElement>(null);
  const addImageToTweet = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    if(!imageRef.current?.value) return;
    setImage(imageRef.current.value)
    imageRef.current.value = '';
    setImageBox(false);
   
  }
const postTweet = async () => {
      const tweetInfo: TweetBody = {
        text: input,
        username: session?.user?.name || 'Unkown user',
        profileImage: session?.user?.image || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        image: image,
      }
      // making a post req to rhe backend
      const result = await fetch(`/api/addTweet`, {
        body: JSON.stringify(tweetInfo),
        method: 'POST',
      })
      // mutate...
      const json = await result.json()
      // refetching the tweets
      const newTweets = await fetchTweets();
      setTweets(newTweets)
      toast('Tweeet Posted', {
        icon: '🚀👨‍🎤'
      })
      return json;


    }

  const handleSubmit = (
    e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
    ) => {
   
    e.preventDefault();
    postTweet();


    setInput("");
    setImage("");
    setImageBox(false);
  };


  
  return (
    <div className='flex space-x-2 p-5'> 
        <img
        
        src={session?.user?.image || "https://links.papareact.com/gll" }
        className='h-14 w-14 object-cover rounded-full mt-4'
        alt="" />
        <div className='flex flex-1 pl-2 items-center'>
            <form className='flex flex-1 flex-col'>
              <input 
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder='Whats`s Happening' 
              className='h-24 w-full text-xl outline-none placeholder:text-xl'/>
              <div className='flex items-center'>

              <div className='flex flex-1 space-x-2 text-twitter'>
                <PhotoIcon onClick={() => setImageBox(!imageBox)} className='h-5 w-5 hover:cursor-pointer transition-transform duration-150 ease-out hover:scale-150'/>
                <MagnifyingGlassCircleIcon className='h-5 w-5'/>
                <FaceSmileIcon className='h-5 w-5'/>
                <CalendarDaysIcon className='h-5 w-5'/>
                <MapPinIcon className='h-5 w-5'/> 
              </div>
                <button 
                onClick={handleSubmit}
                disabled={!input || !session}
                
                className='bg-twitter px-5 py-2 font-bold text-white rounded-full disabled:opacity-40'>Tweet</button>
              </div>
              {imageBox && (
                <form className='mt-5 flex rounded-lg bg-twitter/80 py-2 px-4'>
                  <input 
                  ref={imageRef}
                  className='flex-1 bg-transparent p-2 text-white outline-none placeholder:text-white' type="text" placeholder='Enter Image URL...'/>
                  <button type='submit' onClick={addImageToTweet} className='font-bold text-white'>Add Image</button>
                </form>
              )}
              {image && (
                <img 
                className='mt-10 h-40 w-full rounded-xl object-contain shadow-lg'
                
                src={image} alt="" />
              )}
            </form>
        </div>
    </div>
  )
}

export default TweetBox


