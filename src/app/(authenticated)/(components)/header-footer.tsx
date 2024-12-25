"use client"
import React, { FC } from 'react'


import Image from 'next/image'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Bookmark, Send, Home, Search, PlusSquare, Compass, Film, User2, MessagesSquareIcon } from 'lucide-react'
import { HeaderLogo2 } from '@/components/logo'
import { useRouter } from 'next/navigation'

export interface AppLayoutProps {
  children?: any
}
export function Header() {
  const router = useRouter()
  return (
    <header className="sticky top-0 z-10 bg-white  dark:bg-[#070717] border-b">
      <div className="flex items-center justify-between px-4 py-2 max-w-5xl mx-auto">
        <Link href="/" className=""><HeaderLogo2 /></Link>
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={() => router.push('/home')}><Home className="h-6 w-6" /></Button>
          <Button variant="ghost" size="icon" onClick={() => router.push('/search')}><Search className="h-6 w-6" /></Button>
          <Button variant="ghost" size="icon" onClick={() => router.push('/newPost')}><PlusSquare className="h-6 w-6" /></Button>
          <Button variant="ghost" size="icon" onClick={() => router.push('/messages')}><MessagesSquareIcon className="h-6 w-6" /></Button>
          {/* <Button variant="ghost" size="icon"><Heart className="h-6 w-6" /></Button> */}
          <Avatar onClick={() => router.push('/me')}>
            <AvatarImage src="/img/avatar-place-holder.png" alt="@johndoe" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )

}

export function Footer() {
  const router = useRouter()
  return (
    <footer className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-[#070717] border-t">
      <div className="flex items-center justify-around px-4 py-2">
        <Button variant="ghost" size="icon" onClick={() => router.push('/home')}><Home className="h-6 w-6" /></Button>
        <Button variant="ghost" size="icon" onClick={() => router.push('/search')}><Search className="h-6 w-6" /></Button>
        <Button variant="ghost" size="icon" onClick={() => router.push('/newPost')}><PlusSquare className="h-6 w-6" /></Button>
        <Button variant="ghost" size="icon" onClick={() => router.push('/messages')}><MessagesSquareIcon className="h-6 w-6" /></Button>
        <Button variant="ghost" size="icon" onClick={() => router.push('/me')}><User2 className="h-6 w-6" /></Button>
      </div>
    </footer>
  )

}
