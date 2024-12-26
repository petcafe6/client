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
import Loading from '@/components/loading'
import { relativeTime, s3ImageUrl } from '@/lib/utils'
interface Props {
}
export function MyPostList({ }: Props) {
  const [list, setList] = useState<PostType[]>([])
  const [token, setToken] = useState('')
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const load = () => {
    setLoading(true)
    getItem(`/myPosts`, token)
      .then(result => {
        setList(result.docs as PostType[])
      })
      .catch(err => toast({ title: 'Error', description: err || '', variant: 'destructive' }))
      .finally(() => setLoading(false))
  }

  useEffect(() => { !token && setToken(Cookies.get('token') || '') }, [])
  useEffect(() => { token && load() }, [token])

  return (<>
    {!loading &&
      <div className='flex flex-col w-full gap-4'>
        {list && list.map(e =>
          <Card key={e._id} className="w-full">
            <CardHeader className='pb-2'>
              <CardTitle className='relative text-sm md:text-base font-normal'>
                {e.content}
                <div className='absolute end-[-24px] top-[-24px] cursor-pointer' onClick={() => router.push(`/me/posts/${e._id}`)}>
                  <EditIcon size={'24px'} />
                </div>
              </CardTitle>
              <CardDescription className='flex justify-between items-center text-xs md:text-sm'>
                <span>{e.location}</span>
                <span>{relativeTime(e.createdAt)}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              {e.images && e.images.length > 0 &&
                <Image
                  src={s3ImageUrl(e.images[0])}
                  width={300}
                  height={300}
                  className='aspect-square object-cover'
                  alt='post-image'

                />
              }
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
                likes {e.likes?.length} comments {e.comments?.length}

              </div>
            </CardFooter>
          </Card>
        )}
      </div>
    }
    {loading &&
      <div className='flex flex-auto justify-center items-center min-h-[300px]'>
        <Loading />
      </div>
    }
  </>)
}