import { signIn, useSession } from 'next-auth/react'
import React, { SVGProps } from 'react'

type Props = {
    Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
    title: string
    onClick?: () => {}
}

function SidebarRow({Icon, title, onClick }: Props) {
  const { data: session } = useSession()
  return (
    <div 
    onClick={() => onClick?.()}

    className='flex items-center max-w-fit cursor-pointer space-x-2 px-[2px] py-3 rounded-full hover:bg-gray-100 transition-all duration-200 group'>
        <Icon className='h-6 w-6'/>
        <p className='hidden md:inline-flex group-hover:text-twitter text-base font-light lg:text-lg'>{title}</p>
    </div>
  )
}

export default SidebarRow