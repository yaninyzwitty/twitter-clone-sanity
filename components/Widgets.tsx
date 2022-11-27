import { MagnifyingGlassCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { TwitterTimelineEmbed } from 'react-twitter-embed'

type Props = {}

function Widgets({}: Props) {
  return (
    <div className='col-span-2 mt-2 hidden px-2 lg:inline'>
        {/* search box */}
        <div className='flex items-center space-x-2 bg-gray-100 p-3 rounded-full mt-2'>
            <MagnifyingGlassIcon className='h-5 w-5 text-gray-400'/>
            <input type="text" placeholder='Search Twitter' className='flex-1 outline-none bg-transparent' />
        </div>
        <TwitterTimelineEmbed
  sourceType="profile"
  screenName="yaninyzwitty"
  options={{height: 1000}}
/>
    </div>
  )
}

export default Widgets