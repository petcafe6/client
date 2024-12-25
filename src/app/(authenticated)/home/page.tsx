"use client"

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Bookmark, Heart, MessageCircle, Send } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { useRouter } from 'next/navigation'


export default function Home() {
  const [report, setReport] = useState('')
  return (
    <div className='flex flex-col gap-4'>
      <StoriesSection />
      <Feed />
    </div>
  )
}


function StoriesSection() {
  const stories = [
    { id: 1, username: 'user1', avatar: '/img/avatar-place-holder.png' },
    { id: 2, username: 'user2', avatar: '/img/avatar-place-holder.png' },
    { id: 3, username: 'user3', avatar: '/img/avatar-place-holder.png' },
    { id: 4, username: 'user4', avatar: '/img/avatar-place-holder.png' },
    { id: 5, username: 'user5', avatar: '/img/avatar-place-holder.png' },
    { id: 6, username: 'user6', avatar: '/img/avatar-place-holder.png' },
    { id: 7, username: 'user7', avatar: '/img/avatar-place-holder.png' },
    { id: 8, username: 'user8', avatar: '/img/avatar-place-holder.png' },
  ]

  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md border">
      <div className="flex w-max space-x-4 p-4">
        {stories.map((story) => (
          <div key={story.id} className="flex flex-col items-center space-y-1">
            <Avatar className="w-16 h-16 p-[0px] bg-gradient-to-tr from-yellow-400 to-[#070727]">
              <AvatarImage src={story.avatar} alt={story.username} />
              <AvatarFallback>{story.username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="text-xs">{story.username}</span>
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}

function Feed() {
  const posts = [
    { id: 1, user: { username: 'johndoe', avatar: '/img/avatar-place-holder.png' }, image: '/img/intro-pets.png?height=600&width=600', likes: 42, caption: 'Beautiful day! #sunshine', comments: [{ username: 'janedoe', text: 'Looks amazing!' }] },
    { id: 2, user: { username: 'janedoe', avatar: '/img/avatar-place-holder.png' }, image: '/img/intro-pets.png?height=600&width=600', likes: 28, caption: 'Delicious meal 😋', comments: [{ username: 'johndoe', text: 'Yum!' }] },
  ]
  const roter = useRouter()

  return (
    <div className="space-y-8 mt-8">
      {posts.map((post) => (
        <Card key={post.id} className='bg-transparent'>
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar>
              <AvatarImage src={post.user.avatar} alt={post.user.username} />
              <AvatarFallback>{post.user.username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="font-semibold">{post.user.username}</span>
          </CardHeader>
          <CardContent className="p-0">
            <img
              src={post.image}
              alt="Post image"
              // width={600}
              // height={600}
              className="w-full h-auto"
            />
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-1 text-sm lg:text-base">
            <div className="flex items-center gap-4 w-full">
              <Button variant="ghost" size="icon"><Heart className="h-6 w-6" /></Button>
              <Button variant="ghost" size="icon"><MessageCircle className="h-6 w-6" /></Button>
              <Button variant="ghost" size="icon"><Send className="h-6 w-6" /></Button>
              <Button variant="ghost" size="icon" className="ml-auto"><Bookmark className="h-6 w-6" /></Button>
            </div>
            <div>
              <p className="font-semibold">{post.likes} likes</p>
              <p><span className="font-semibold">{post.user.username}</span> {post.caption}</p>
            </div>
            {post.comments.map((comment, index) => (
              <p key={index}><span className="font-semibold">{comment.username}</span> {comment.text}</p>
            ))}
            <Input placeholder="Add a comment..." className="w-full" />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}