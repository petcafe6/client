"use client"
import { Button } from '@/components/ui/button'
import Image from "next/image"
import Link from 'next/link'
import { redirect, RedirectType, useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { getItem } from '@/lib/fetch'
import CustomLink from '@/components/custom-link'
import Cookies from 'js-cookie'
import { UserType } from '@/types/UserType'
import { Edit, EditIcon, SettingsIcon } from 'lucide-react'

export default function MePage() {
  const [token, setToken] = useState('')
  const [user, setUser] = useState<UserType | null>(null)
  const router = useRouter()

  useEffect(() => { !token && setToken(Cookies.get('token') || '') }, [])
  useEffect(() => {
    if (token) {
      getItem('/me', token)
        .then(result => setUser(result as UserType))
        .catch(err => console.log(err))
    }
  }, [token])

  return (<>
    {user && <>
      <div className="w-full m11ax-w-3xl ">
        <div className="w-full flex justify-between items-start gap-2">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.profilePicture || '/placeholder-user.jpg'} alt="profilePicture" />
            {/* <AvatarFallback>{user.name} Ali TEK</AvatarFallback> */}
          </Avatar>
          <div className='flex flex-col text-sm'>
            <div>{user.username}</div>
            <div>{user.email}</div>
          </div>
          <div className='flex flex-col space-y-2'>
            <Button variant={'outline'} className='px-3' onClick={() => router.push('/me/edit')}>
              <SettingsIcon />
            </Button>
            <Button variant={'outline'} className='px-3' onClick={() => router.push('/me/edit')}>
              <EditIcon />
            </Button>
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <div>{user.name}</div>
          <div className="text-muted-foreground text-xs md:text-sm">
            {user.bio}
          </div>

        </div>

      </div>
    </>}
  </>)
}
