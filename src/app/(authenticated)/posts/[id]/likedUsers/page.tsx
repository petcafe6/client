"use client"

import { useEffect, useRef, useState } from 'react'
import { getItem, getList, postItem } from '@/lib/fetch'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { LikeType, PostType } from '@/types/PostType'
import { useToast } from '@/components/ui/use-toast'
import { PostView } from '../../../(components)/post-view'
import { relativeTime, s3ImageUrl } from '@/lib/utils'
import Loading from '@/components/loading'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { HeartIcon, ReplyIcon, SendHorizontalIcon, SmileIcon } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { Avatar, AvatarImage } from '@/components/ui/avatar'

interface Props {
  params: {
    id: string
  }
}
export default function LikedUsersPage({ params }: Props) {
  const [list, setList] = useState<LikeType[]>([])
  const [token, setToken] = useState('')
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const load = () => {
    setLoading(true)
    getList(`/posts/${params.id}/likedUsers`, token)
      .then(result => {
        setList(result.docs as LikeType[])
        console.log(`result.docs:`, result.docs)
      })
      .catch(err => toast({ title: 'Error', description: err || '', variant: 'destructive' }))
      .finally(() => setLoading(false))
  }

  useEffect(() => { !token && setToken(Cookies.get('token') || '') }, [])
  useEffect(() => { token && load() }, [token])

  return (<>
    <div className='relative h-[85vh] pb-20'>
      <div className='flex flex-col gap-6 h-full  overflow-y-auto pe-2 pb-8'>
        {!loading && list && list.map(e =>
          <div key={e._id} className='flex flex-col'>
            <div className='flex flex-col'>
              <div className='flex justify-start items-center space-x-2 text-xs '>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={s3ImageUrl(e.likedBy?.profilePicture) || '/placeholder-user.jpg'} alt="profilePicture" />
                </Avatar>
                <div className='flex items-center'>
                  <div className='font-bold text-nowrap me-2'>{e.likedBy?.name}</div>
                  <div>{relativeTime(e.createdAt)}</div>
                </div>
              </div>

            </div>

          </div>
        )}
        {loading &&
          <div className='min-h-96 flex justify-center items-center'>
            <Loading />
          </div>
        }
      </div>

    </div>
  </>)
}