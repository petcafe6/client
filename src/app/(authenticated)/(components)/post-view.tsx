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
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'

interface Props {
  value: PostType
  editable?: boolean
}
export function PostView({ value, editable }: Props) {
  const [post, setPost] = useState<PostType>(value)
  const [token, setToken] = useState('')
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const router = useRouter()


  const likePost = () => {
    postItem(`/posts/${post._id}/like`, token, {})
      .then(result => {
        setPost(result as PostType)
      })
      .catch(err => toast({ description: err || '', duration: 1000, variant: 'destructive' }))
  }

  const savePost = () => {
    postItem(`/posts/${post._id}/save`, token, {})
      .then(result => {
        setPost(result as PostType)
        console.log(`result:`, result)
      })
      .catch(err => toast({ description: err || '', duration: 1000, variant: 'destructive' }))
  }

  useEffect(() => { !token && setToken(Cookies.get('token') || '') }, [])

  return (<>
    {post &&
      <Card key={post._id} className="w-full">
        <CardHeader className='pb-2 px-4'>
          <div className='flex justify-start items-center space-x-4'>
            <Avatar className="h-12 w-12">
              <AvatarImage src={s3ImageUrl(post.author?.profilePicture) || '/placeholder-user.jpg'} alt="profilePicture" />
            </Avatar>
            <div className='flex flex-col'>
              <div>{post.author?.name}</div>
            </div>
          </div>
          <CardTitle className='relative'>
            <span className='text-sm md:text-base font-normal text-ellipsis overflow-hid11den line-clamp-3'>
              {post.content}
            </span>

            {editable &&
              <span className='absolute end-[-16px] top-[-24px] cursor-pointer' onClick={() => router.push(`/me/posts/${post._id}`)}>
                <EditIcon size={'24px'} />
              </span>
            }
          </CardTitle>
          <CardDescription className='flex justify-between items-center text-xs md:text-sm'>
            <span className='flex space-x-2'>
              {post.location && <>
                <MapPin size={'14px'} /> <span>{post.location}</span>
              </>}
            </span>
            <span>
              {relativeTime(post.createdAt)}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className='px-2 flex justify-center'>
          {post.images && post.images.length > 0 && <ImageCarousel images={post.images} />}

        </CardContent>
        <CardFooter className='flex flex-col pb-3'>
          <div className='flex justify-between items-center w-full'>
            <div className='flex justify-start gap-4'>
              <div className='cursor-pointer' onClick={likePost}>
                {!post.liked && <HeartIcon />}
                {post.liked && <HeartIcon fill='red' color='red' />}
              </div>
              <div>
                <Link href={`/comments/${post._id}`} >
                  <MessageCircleIcon rotate={'180deg'} />
                </Link>
              </div>
              <div>
                <ButtonShare
                  url={`/posts/${post._id}`}
                  content={post.content}
                  hashtag={post.hashtags?.join(', ')}
                />
              </div>
            </div>
            <div className='cursor-pointer' onClick={savePost}>
              {!post.saved && <BookmarkIcon />}
              {post.saved && <BookmarkIcon fill='orange' color='orange' />}
            </div>

          </div>
          <div className='flex justify-between items-center w-full  text-xs md:text-sm mt-6'>
            <div>
              {post.likeCount! > 0 &&
                <Link className='space-x-2' href={`/posts/${post._id}/likedUsers`}>
                  <span >Likes</span>
                  <span className='font-bold'>{post.likeCount}</span>
                </Link>
              }
            </div>
            <div>
              {post.commentCount! > 0 &&
                <Link className='flex gap-1 text-muted-foreground'
                  href={`/comments/${post._id}`}
                >
                  <span>View all</span>
                  <span>{post.commentCount}</span>
                  <span>comments</span>
                </Link>
              }
            </div>
          </div>
        </CardFooter>
      </Card>
    }
  </>)
}