"use client"

import { useEffect, useRef, useState } from 'react'
import { getItem, getList, postItem } from '@/lib/fetch'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { CommentType, PostType } from '@/types/PostType'
import { useToast } from '@/components/ui/use-toast'
import { PostView } from '../../(components)/post-view'
import { relativeTime, s3ImageUrl } from '@/lib/utils'
import Loading from '@/components/loading'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { HeartIcon, ReplyIcon, SendHorizontalIcon, SmileIcon } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { MsgBox } from '../../(components)/msg-box'

interface Props {
  params: {
    id: string
  }
}
export default function CommentsPage({ params }: Props) {
  const [list, setList] = useState<CommentType[]>([])
  const [token, setToken] = useState('')
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  // const [comment, setComment] = useState<CommentType>({})

  function focusComment() {
    document.getElementById('txtComment')?.focus()
  }

  const sendComment = (comment?: string) => {
    // if (comment.text?.trim() == '') return
    setLoading(true)
    postItem(`/posts/${params.id}/addNewComment`, token, { text: comment })
      .then(result => {
        list.unshift(result as CommentType)
        setList(list)
        // setComment({ text: '' })
      })
      .catch(err => toast({ title: 'Error', description: err || '', variant: 'destructive' }))
      .finally(() => {
        setLoading(false)
        focusComment()
      })

  }
  const load = () => {
    setLoading(true)
    // setTimeout(() => {
    getList(`/posts/${params.id}/comments`, token)
      .then(result => {
        setList(result.docs as CommentType[])

      })
      .catch(err => toast({ title: 'Error', description: err || '', variant: 'destructive' }))
      .finally(() => {
        setLoading(false)
        focusComment()
      })
    // }, 1000)
  }

  useEffect(() => { !token && setToken(Cookies.get('token') || '') }, [])
  useEffect(() => { token && load() }, [token])

  return (<>
    <div className='relative h-[85vh] pb-20'>
      <div className='flex flex-col gap-6 h-full  overflow-y-auto pe-2 pb-8'>
        {!loading && list && list.map(e =>
          <div key={e._id} className='flex flex-col'>
            <div className='flex flex-col'>
              <div className='flex justify-start items-start space-x-2 text-xs '>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={s3ImageUrl(e.commentBy?.profilePicture) || '/placeholder-user.jpg'} alt="profilePicture" />
                </Avatar>
                <div className='flex flex-col'>

                  <div className='line-clamp-4 font-normal'>
                    <span className='font-bold text-nowrap me-2'>{e.commentBy?.name}</span>
                    {e.text}
                  </div>
                  <div className='flex justify-start items-center gap-6 text-xs text-muted-foreground'>
                    <div>{relativeTime(e.createdAt)}</div>
                    <div className='flex items-center gap-2'><HeartIcon size={'18px'} /> 0</div>
                    <div><ReplyIcon size={'18px'} /></div>


                  </div>
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
      <div className='absolute bottom-[-10px] flex w-full'>
        <MsgBox onSend={e => sendComment(e)} />
      </div>
    </div>
  </>)
}