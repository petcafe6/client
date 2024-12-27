"use client"
import { Button } from '@/components/ui/button'
import Image from "next/image"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { getItem } from '@/lib/fetch'
import CustomLink from '@/components/custom-link'
import Cookies from 'js-cookie'
import { UserType } from '@/types/UserType'
import { BookmarkIcon, Edit, EditIcon, Grid3x3Icon, PawPrintIcon, SettingsIcon, TagIcon, TagsIcon } from 'lucide-react'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { MyPetList } from './pets/my-pet-list'
import MyPostList from './posts/page'

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
            <Button variant={'outline'} className='px-3' onClick={() => router.push('/settings')}>
              <SettingsIcon />
            </Button>
            <Button variant={'outline'} className='px-3' onClick={() => router.push('/me/edit')}>
              <EditIcon />
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <div>{user.name}</div>
          <div className="text-muted-foreground text-xs md:text-sm">
            {user.bio}
          </div>
          <div className='flex justify-around items-center border-y h-16 text-center'>
            <div className='flex flex-col'>
              <Label className='fon11t-bold'>{user.postCount}</Label>
              <Label className='text-muted-foreground text-xs'>posts</Label>
            </div>
            <div className='flex flex-col'>
              <Label>{user.followerCount}</Label>
              <Label className='text-muted-foreground text-xs'>followers</Label>
            </div>
            <div className='flex flex-col'>
              <Label>{user.followingCount}</Label>
              <Label className='text-muted-foreground text-xs'>following</Label>
            </div>
          </div>
          <MeTabs />
        </div>

      </div>
    </>}
  </>)
}

export function MeTabs() {
  const router = useRouter()
  return (
    <Tabs defaultValue="posts" className="w-full">
      <TabsList className="grid w-full grid-cols-4 gap-2">

        <TabsTrigger value="posts"><Grid3x3Icon /></TabsTrigger>
        <TabsTrigger value="pets"><PawPrintIcon /></TabsTrigger>
        <TabsTrigger value="bookmarks"><BookmarkIcon /></TabsTrigger>
        <TabsTrigger value="tagged"><TagIcon /></TabsTrigger>
      </TabsList>
      <TabsContent value="posts">
        <h3>Posts</h3>
        <Button onClick={() => router.push('/me/posts/addnew')}>Yeni Post</Button>
        <MyPostList />
      </TabsContent>
      <TabsContent value="pets">
        <h3>My Pets</h3>
        <Button onClick={() => router.push('/me/pets/addnew')}>Yeni Pet</Button>
        <MyPetList />
      </TabsContent>
      <TabsContent value="bookmarks">
        <h3>bookmarks</h3>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate fuga ducimus odio, animi autem nihil itaque repudiandae, porro voluptas magnam quae voluptates ex tenetur a, consequatur eos. Suscipit, rerum harum!</p>
      </TabsContent>
      <TabsContent value="tagged">
        <h3>tagged</h3>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere animi ad aperiam quae corrupti nam molestias omnis nihil ullam nesciunt enim sit, deleniti voluptates sunt reprehenderit delectus asperiores vel cumque.</p>
      </TabsContent>
    </Tabs>
  )
}