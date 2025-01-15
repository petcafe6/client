"use client"

import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Bookmark, Heart, MessageCircle, Send } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { ConversationType } from '@/types/ConversationType'
import { getList } from '@/lib/fetch'
import Cookies from 'js-cookie'
import { s3ImageUrl } from '@/lib/utils'

export default function ConversationPage() {
  const [list, setList] = useState<ConversationType[]>([])
  const [token, setToken] = useState('')
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const router = useRouter()


  const load = () => {
    setLoading(true)
    getList(`/messages`, token)
      .then(result => {
        setList(result.docs as ConversationType[])
        console.log(`result.docs:`, result.docs)
      })
      .catch(err => toast({ title: 'Error', description: err || '', variant: 'destructive' }))
      .finally(() => setLoading(false))
  }

  useEffect(() => { !token && setToken(Cookies.get('token') || '') }, [])
  useEffect(() => { token && load() }, [token])


  return (<>
    {!loading &&
      <div className='flex flex-col gap-4'>
        {list && list.map((e, index) =>
          <div key={e._id} className='flex justify-start items-center space-x-4'>
            <Avatar className="h-12 w-12">
              <AvatarImage src={s3ImageUrl(e.user?.profilePicture) || '/placeholder-user.jpg'} alt="profilePicture" />
            </Avatar>
            <div className='flex flex-col'>
              <div>{e.user?.name}</div>
            </div>
          </div>
        )}

      </div>
    }
  </>
  )
}
