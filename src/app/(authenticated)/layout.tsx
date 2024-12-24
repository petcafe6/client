import React, { FC } from 'react'
import { Metadata } from "next"


import { RedirectType, redirect } from 'next/navigation'
import { DashboardHeader } from './(components)/header'
import DashboardFooter from './(components)/dashboard-footer'
import { UserType } from '@/types/UserType'
import { getAuthToken } from '@/lib/authHelper'


import Image from 'next/image'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Heart, MessageCircle, Bookmark, Send, Home, Search, PlusSquare, Compass, Film, User2, MessagesSquareIcon } from 'lucide-react'
import { HeaderLogo2 } from '@/components/logo'

export interface AppLayoutProps {
  children?: any
}
const AppLayout: FC<AppLayoutProps> = ({ children }) => {

  if (!getAuthToken()) {
    return redirect('/auth/login', RedirectType.push)
  }

  return (
    <div className="flex flex-col min-h-screen  bg-gray-50 dark:bg-[#070717]">
      <header className="sticky top-0 z-10 bg-white  dark:bg-[#070717] border-b">
        <div className="flex items-center justify-between px-4 py-2 max-w-5xl mx-auto">
          <Link href="/" className=""><HeaderLogo2 /></Link>
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon"><Home className="h-6 w-6" /></Button>
            <Button variant="ghost" size="icon"><Search className="h-6 w-6" /></Button>
            <Button variant="ghost" size="icon"><PlusSquare className="h-6 w-6" /></Button>
            <Button variant="ghost" size="icon"><MessagesSquareIcon className="h-6 w-6" /></Button>
            {/* <Button variant="ghost" size="icon"><Heart className="h-6 w-6" /></Button> */}
            <Avatar>
              <AvatarImage src="/img/avatar-place-holder.png" alt="@johndoe" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="flex-grow pb-16 md:pb-0 max-w-full overflow-hidden">
        <div className="max-w-2xl mx-auto py-0">
          {children}
        </div>
      </div>
      <footer className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-[#070717] border-t">
        <div className="flex items-center justify-around px-4 py-2">
          <Button variant="ghost" size="icon"><Home className="h-6 w-6" /></Button>
          <Button variant="ghost" size="icon"><Search className="h-6 w-6" /></Button>
          <Button variant="ghost" size="icon"><PlusSquare className="h-6 w-6" /></Button>
          <Button variant="ghost" size="icon"><MessagesSquareIcon className="h-6 w-6" /></Button>
          <Button variant="ghost" size="icon"><User2 className="h-6 w-6" /></Button>
        </div>
      </footer>
    </div>
  )

}

export default AppLayout