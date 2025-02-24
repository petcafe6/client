"use client"
import React, { FC, useEffect, useState } from 'react'


import Image from 'next/image'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Bookmark, Send, Home, Search, PlusSquare, Compass, Film, User2, MessagesSquareIcon, User2Icon } from 'lucide-react'
import { HeaderLogo2 } from '@/components/logo'
import { useRouter } from 'next/navigation'
import { UserType } from '@/types/UserType'
import Cookies from 'js-cookie'
import { s3ImageUrl } from '@/lib/utils'
export interface AppLayoutProps {
  children?: any
}
export function Header() {
  const [user, setUser] = useState<UserType | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      setUser(JSON.parse(Cookies.get('user') || '{}') as UserType)
    }
  }, [])
  return (
    <header className="sticky top-0 z-10 bg-white  dark:bg-[#000] border-b">
      {user && <>
        <div className="flex items-center justify-between px-4 py-2 max-w-5xl mx-auto">
          <Link href="/home" className=""><HeaderLogo2 /></Link>
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => router.push('/home')}><Home className="h-6 w-6" /></Button>
            <Button variant="ghost" size="icon" onClick={() => router.push('/search')}><Search className="h-6 w-6" /></Button>
            <Button variant="ghost" size="icon" onClick={() => router.push('/me/posts/addnew')}><PlusSquare className="h-6 w-6" /></Button>
            <Button variant="ghost" size="icon" onClick={() => router.push('/messages')}><MessagesSquareIcon className="h-6 w-6" /></Button>
            {/* <Button variant="ghost" size="icon" onClick={() => router.push('/me')}> */}
            <Link href="/me">
              {!user.profilePicture && <User2Icon className="h-6 w-6" />}
              {user.profilePicture && <img src={s3ImageUrl(user.profilePicture)} className='rounded-full h-8 w-8' />}
            </Link>
            {/* </Button> */}
            {/* <Avatar onClick={() => router.push('/me')} className='cursor-pointer'>
           
        </Avatar> */}
          </div>
        </div>
      </>}
    </header >
  )

}

export function Footer() {
  const [user, setUser] = useState<UserType | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      setUser(JSON.parse(Cookies.get('user') || '{}') as UserType)
    }
  }, [])
  return (
    <footer className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-[#000] border-t">
      {user && <>
        <div className="flex items-center justify-around px-4 py-2">
          <Button variant="ghost" size="icon" onClick={() => router.push('/home')}><Home className="h-6 w-6" /></Button>
          <Button variant="ghost" size="icon" onClick={() => router.push('/search')}><Search className="h-6 w-6" /></Button>
          <Button variant="ghost" size="icon" onClick={() => router.push('/me/posts/addnew')}><PlusSquare className="h-6 w-6" /></Button>
          <Button variant="ghost" size="icon" onClick={() => router.push('/messages')}><MessagesSquareIcon className="h-6 w-6" /></Button>
          {/* <Button variant="ghost" size="icon" onClick={() => router.push('/me')}><User2 className="h-6 w-6" /></Button> */}
          {/* <Button variant="ghost" size="icon" onClick={() => router.push('/me')}> */}
          <Link href="/me">
            {!user.profilePicture && <User2Icon className="h-6 w-6" />}
            {user.profilePicture && <img src={s3ImageUrl(user.profilePicture)} className='rounded-full h-8 w-8' />}
          </Link>
          {/* </Button> */}
        </div>
      </>}
    </footer>
  )

}
