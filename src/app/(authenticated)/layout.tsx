import React, { FC } from 'react'
import { Metadata } from "next"


import { RedirectType, redirect } from 'next/navigation'
import { DashboardHeader } from './(components)/header11'
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
import { Footer, Header } from './(components)/header-footer'

export interface AppLayoutProps {
  children?: any
}
const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  // if (!getAuthToken()) {
  //   return redirect('/auth/login', RedirectType.push)
  // }

  return (
    <div className="flex flex-col min-h-screen  bg-gray-50 dark:bg-[#000]">
      <Header />

      <div className="flex-grow pb-16 md:pb-0 max-w-full overflow-hidden">
        <div className="max-w-3xl py-0 mx-4 md:mx-auto my-2">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  )

}

export default AppLayout