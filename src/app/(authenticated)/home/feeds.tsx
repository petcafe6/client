"use client"

import { useEffect, useState } from 'react'
import { getItem } from '@/lib/fetch'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { PostType } from '@/types/PostType'
import { useToast } from '@/components/ui/use-toast'
import { PostView } from '../(components)/post-view'

interface Props {
}
export function Feeds({ }: Props) {
  const [list, setList] = useState<PostType[]>([])
  const [token, setToken] = useState('')
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [pageNo, setPageNo] = useState(1)
  const router = useRouter()

  const load = () => {
    setLoading(true)
    getItem(`/posts?page=${pageNo}`, token)
      .then(result => {
        setPageNo(result.page || 1)
        setList(result.docs as PostType[])
      })
      .catch(err => toast({ title: 'Error', description: err || '', variant: 'destructive' }))
      .finally(() => setLoading(false))
  }

  useEffect(() => { !token && setToken(Cookies.get('token') || '') }, [])
  useEffect(() => { token && load() }, [token])

  return (<>
    <div className="space-y-8 mt-0">
      {list.map(e => <PostView key={e._id} value={e} />)}
    </div>
  </>)
}