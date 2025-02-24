"use client"

import { useEffect, useState } from 'react'
import { getItem, getList, postItem } from '@/lib/fetch'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { ConversationType, MessageType } from '@/types/ConversationType'
import { useToast } from '@/components/ui/use-toast'
import Loading from '@/components/loading'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { relativeTime, s3ImageUrl } from '@/lib/utils'
import { MsgBox } from '../../(components)/msg-box'
import { UserType } from '@/types/UserType'
import { HistoryIcon } from 'lucide-react'

interface Props {
  params: {
    id: string
  }
}
export function ConversationPage({ params }: Props) {
  const [list, setList] = useState<MessageType[]>([])
  const [conversation, setConversation] = useState<ConversationType>({})
  const [token, setToken] = useState('')
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(0)
  const router = useRouter()
  const [user, setUser] = useState<UserType | null>(null)
  const senderClass = 'flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-muted'
  const receiverClass = 'flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-primary text-primary-foreground'

  const load = (p?: number) => {
    if (p) {
      setPage(p)
    }
    setLoading(true)
    setUser(JSON.parse(Cookies.get('user') || '{}') as UserType)
    getList(`/messages/${params.id}?page=${p || page}`, token)
      .then(result => {
        setPageCount(result.pageCount)
        if (result.page > 1) {
          setList(list.concat(result.docs as MessageType[]))
        } else {
          setList(result.docs as MessageType[])
        }

        setConversation(result.conversation)
      })
      .catch(err => toast({ title: 'Error', description: err || '', variant: 'destructive' }))
      .finally(() => setLoading(false))
  }

  const sendMessage = (content: string) => {
    setLoading(true)
    postItem(`/messages`, token, { content: content, to: conversation.user })
      .then(newMsg => {
        // setPageCount(result.pageCount)
        // setList(result.docs as MessageType[])
        // setConversation(result.conversation)
        list.unshift(newMsg as MessageType)
        setList(list)
      })
      .catch(err => toast({ title: 'Error', description: err || '', variant: 'destructive' }))
      .finally(() => setLoading(false))
  }

  useEffect(() => { !token && setToken(Cookies.get('token') || '') }, [])
  useEffect(() => { token && load() }, [token])

  return (<div className='w-full relative h-[85vh] pb-24'>
    {user && <>
      {!loading && <>
        {/* <div className='flex flex-col gap-4'> */}
        <div className='flex justify-start items-center space-x-4'>
          <Avatar className="h-12 w-12">
            <AvatarImage src={s3ImageUrl(conversation.user?.profilePicture) || '/placeholder-user.jpg'} alt="profilePicture" />
          </Avatar>
          <div className='flex flex-col'>
            <div>{conversation.user?.name}</div>
          </div>
        </div>
        <div className='flex flex-col-reverse  gap-6 h-full overflow-y-auto pe-2 pb-8'>

          {list && list.map(e =>
            <div key={e._id} className='flex flex-col'>
              <div className={`${e.sender?._id == conversation.user?._id ? senderClass : receiverClass}`}
              >{e.content}</div>
              <div className={`px-2 text-[7pt] flex ${e.sender?._id == conversation.user?._id ? 'justify-start' : 'justify-end'} `}
              >{relativeTime(e.createdAt)}</div>
            </div>
          )}
          <div className={`${page >= pageCount ? 'hidden' : 'flex justify-center gap-4 text-muted-foreground'}`} onClick={() => {
            load(page + 1)
          }}>... <HistoryIcon size={32} /> ...</div>
        </div>
        {/* </div> */}
      </>
      }
      {loading && <div><Loading /></div>}
      <div className='absolute bottom-[-12px] flex w-full'>
        <MsgBox onSend={e => sendMessage(e)} />
      </div>
    </>}
  </div>)
}

export default ConversationPage