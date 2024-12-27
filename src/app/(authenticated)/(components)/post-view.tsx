"use client"

import { useEffect, useState } from 'react'
import { getItem, postItem } from '@/lib/fetch'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { PostType } from '@/types/PostType'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { BookmarkIcon, Edit2Icon, EditIcon, HeartIcon, MapPin, MessageCircleIcon, Share2Icon } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
import { relativeTime, s3ImageUrl } from '@/lib/utils'
import { ImageCarousel } from './image-carousel'
import { ButtonShare } from '@/components/button-share'

interface Props {
  value: PostType
}
export function PostView({ value }: Props) {
  const [post, setPost] = useState<PostType>(value)
  const [token, setToken] = useState('')
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const router = useRouter()


  useEffect(() => { !token && setToken(Cookies.get('token') || '') }, [])

  return (<>
    <Card key={post._id} className="w-full">
      <CardHeader className='pb-2 px-4'>
        <CardTitle className='relative'>
          <span className='text-sm md:text-base font-normal text-ellipsis overflow-hid11den line-clamp-3'>
            {post.content}
          </span>

          <span className='absolute end-[-16px] top-[-24px] cursor-pointer' onClick={() => router.push(`/me/posts/${post._id}`)}>
            <EditIcon size={'24px'} />
          </span>
        </CardTitle>
        <CardDescription className='flex justify-between items-center text-xs md:text-sm'>
          <span className='flex space-x-2'>
            {post.location && <>
              <MapPin size={'14px'} /> <span>{post.location}</span>
            </>}
          </span>
          <span>{relativeTime(post.createdAt)}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className='px-2 flex justify-center'>
        {post.images && post.images.length > 0 && <ImageCarousel images={post.images} />}

      </CardContent>
      <CardFooter className='flex flex-col'>
        <div className='flex justify-between items-center w-full'>
          <div className='flex justify-start gap-4'>
            <div className='cursor-pointer'
              onClick={() => {
                postItem(`/posts/like/${post._id}`, token, {})
                  .then(result => {
                    setPost(result as PostType)
                  })
                  .catch(err => toast({ description: err || '', duration: 1000, variant: 'destructive' }))
              }}
            >
              {!post.liked && <HeartIcon />}
              {post.liked && <HeartIcon fill='red' color='red' />}
            </div>
            <div><MessageCircleIcon rotate={'180deg'} /></div>
            <div>
              <ButtonShare
                url={`/posts/${post._id}`}
                content={post.content}
                hashtag={post.hashtags?.join(', ')}
              />
            </div>
          </div>
          <div>
            <BookmarkIcon />
          </div>
        </div>
        <div className='flex flex-col w-full  text-xs md:text-sm mt-2'>
          {post.likes && post.likes?.length > 0 &&
            <div className='space-x-2'>
              <span >Likes</span>
              <span className='font-bold'>{post.likes?.length}</span>
            </div>
          }
          <div>
            <span>comments</span>
            <span>{post.comments?.length}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  </>)
}