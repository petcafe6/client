"use client"

import { useEffect, useState } from 'react'
import { getItem, getList } from '@/lib/fetch'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { ConversationType, MessageType } from '@/types/ConversationType'
import { useToast } from '@/components/ui/use-toast'
import Loading from '@/components/loading'

interface Props {
  params: {
    id: string
  }
}
export function DemoComponent({ params }: Props) {
  const [list, setObj] = useState<MessageType[]>([])
  const [token, setToken] = useState('')
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const load = () => {
    setLoading(true)
    getItem(`/`, token)
      .then(result => {
        setObj(result.docs as MessageType[])
      })
      .catch(err => toast({ title: 'Error', description: err || '', variant: 'destructive' }))
      .finally(() => setLoading(false))
  }

  useEffect(() => { !token && setToken(Cookies.get('token') || '') }, [])
  useEffect(() => { token && load() }, [token])

  return (<div className='w-full relative'>
    {!loading &&
      <div>

      </div>
    }
    {loading && <div><Loading /></div>}
  </div>)
}