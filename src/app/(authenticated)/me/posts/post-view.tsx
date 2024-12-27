"use client"

import { useEffect, useState } from 'react'
import { getItem } from '@/lib/fetch'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { PostType } from '@/types/PostType'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { BookmarkIcon, Edit2Icon, EditIcon, HeartIcon, MessageCircleIcon, Share2Icon } from 'lucide-react'
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

interface Props {
  value: PostType
}
export function PostView({ value }: Props) {
  const [post, setPost] = useState<PostType>(value)
  const [token, setToken] = useState('')
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // const load = () => {
  //   setLoading(true)
  //   getItem(`/`, token)
  //     .then(result => {
  //       setObj(result as DemoType)
  //     })
  //     .catch(err => toast({ title: 'Error', description: err || '', variant: 'destructive' }))
  //     .finally(() => setLoading(false))
  // }

  useEffect(() => { !token && setToken(Cookies.get('token') || '') }, [])
  // useEffect(() => { token && load() }, [token])

  return (<>
    <Card key={post._id} className="w-full">
      <CardHeader className='pb-2 px-4'>
        <CardTitle className='relative text-sm md:text-base font-normal'>
          {post.content}
          <div className='absolute end-[-16px] top-[-24px] cursor-pointer' onClick={() => router.push(`/me/posts/${post._id}`)}>
            <EditIcon size={'24px'} />
          </div>
        </CardTitle>
        <CardDescription className='flex justify-between items-center text-xs md:text-sm'>
          <span>{post.location}</span>
          <span>{relativeTime(post.createdAt)}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className='px-2'>
        {post.images && <ImageCarousel images={post.images} />}
        {/* {post.images && post.images.length > 0 &&
          <Image
            src={s3ImageUrl(post.images[0])}
            width={300}
            height={300}
            className='aspect-square object-cover'
            alt='post-image'

          />
        } */}
      </CardContent>
      <CardFooter className='flex flex-col'>
        <div className='flex justify-between items-center w-full'>
          <div className='flex justify-start gap-4'>
            <div><HeartIcon /></div>
            <div><MessageCircleIcon rotate={'180deg'} /></div>
            <div><Share2Icon /></div>
          </div>
          <div>
            <BookmarkIcon />
          </div>
        </div>
        <div className='text-xs md:text-sm'>
          likes {post.likes?.length} comments {post.comments?.length}

        </div>
      </CardFooter>
    </Card>
  </>)
}