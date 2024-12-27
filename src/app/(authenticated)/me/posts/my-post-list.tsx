"use client"

import { useEffect, useState } from 'react'
import { getItem } from '@/lib/fetch'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { PostType } from '@/types/PostType'
import { useToast } from '@/components/ui/use-toast'

import Loading from '@/components/loading'
import { relativeTime, s3ImageUrl } from '@/lib/utils'
import { PostView } from './post-view'
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
          <div key={e._id}>
            <PostView value={e} />
          </div>
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