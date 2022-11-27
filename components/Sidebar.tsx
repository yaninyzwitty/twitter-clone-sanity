import React from 'react'
import { HomeIcon,HashtagIcon, BellIcon, BookmarkIcon, UserIcon, EllipsisHorizontalCircleIcon, InboxIcon, CircleStackIcon  } from '@heroicons/react/24/outline'
import Image from 'next/image'
import SidebarRow from './SidebarRow'
import { signIn, signOut, useSession } from 'next-auth/react'


function Sidebar() {
  const { data: session } = useSession();
  // console.log(session)

  return (
    <div className='flex flex-col items-center px-[2px] md:items-start'>
        <Image 
        className='m-4'
        height={41}
        width={41}
       
        src="https://links.papareact.com/drq" 
        alt="" />
        <SidebarRow Icon={HomeIcon} title="Home" />
        <SidebarRow Icon={HashtagIcon} title="Explore" />
        <SidebarRow Icon={BellIcon} title="Notifications" />
        <SidebarRow Icon={InboxIcon} title="Messages" />
        <SidebarRow Icon={BookmarkIcon} title="Bookmarks" />
        <SidebarRow Icon={CircleStackIcon} title="Lists" />
        <SidebarRow 
        onClick={!session ? () => signIn() : () => signOut()}
         Icon={UserIcon} title={session ? 'Sign Out': 'Sign In'} />

        <SidebarRow Icon={EllipsisHorizontalCircleIcon} title="More" />

       


    </div>
  )
}

export default Sidebar