"use client"

import { useEffect, useState } from 'react'
import { getItem } from '@/lib/fetch'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { PostType } from '@/types/PostType'
import { useToast } from '@/components/ui/use-toast'
import { PostView } from '../../(components)/post-view'
import { relativeTime } from '@/lib/utils'
import Loading from '@/components/loading'
import { Input } from '@/components/ui/input'

interface Props {
  params: {
    id: string
  }
}
export default function PostPage({ params }: Props) {
  const [post, setPost] = useState<PostType>()
  const [token, setToken] = useState('')
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const load = () => {
    setLoading(true)
    // setTimeout(() => {
    getItem(`/posts/${params.id}`, token)
      .then(result => setPost(result as PostType))
      .catch(err => toast({ title: 'Error', description: err || '', variant: 'destructive' }))
      .finally(() => setLoading(false))
    // }, 1000)
  }

  useEffect(() => { !token && setToken(Cookies.get('token') || '') }, [])
  useEffect(() => { token && load() }, [token])

  return (<>
    {!loading && <>
      {post && <PostView value={post} />}
    </>}
    {loading &&
      <div className='min-h-96 flex justify-center items-center'>
        <Loading />
      </div>
    }
  </>)
}