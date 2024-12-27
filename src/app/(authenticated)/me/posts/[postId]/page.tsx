"use client"

import { useEffect, useState } from 'react'
import { getItem, postItem, putItem } from '@/lib/fetch'
// import { PetType } from '@/types/PetType'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { useToast } from '@/components/ui/use-toast'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
// import { SelectPetType } from '@/components/select-posttype'
// import { cNumber } from '@/lib/utils'
// import { SelectPetGender } from '@/components/select-postgender'
import { ArrowLeftIcon, CheckCheckIcon, CheckIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ImageGallery } from '../../../(components)/image-gallery'
import { PostType } from '@/types/PostType'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Textarea } from '@/components/ui/textarea'

interface Props {
  params: {
    postId: string
  }
}
export default function PostPage({ params }: Props) {
  const [token, setToken] = useState('')
  const [post, setPost] = useState<PostType>({})
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const save = () => {
    setLoading(true)
    if (params.postId == 'addnew') {
      postItem(`/myPosts`, token, post)
        .then(result => router.push('/me/posts'))
        .catch(err => toast({ title: 'Error', description: err || '', variant: 'destructive' }))
        .finally(() => setLoading(false))
    } else {
      putItem(`/myPosts/${params.postId}`, token, post)
        .then(result => router.push('/me/posts'))
        .catch(err => toast({ title: 'Error', description: err || '', variant: 'destructive' }))
        .finally(() => setLoading(false))
    }

  }

  const cancelClick = () => {
    if (confirm(`Do you want to cancel?`)) {
      router.back()
    }
  }
  const load = () => {
    setLoading(true)
    getItem(`/myPosts/${params.postId}`, token)
      .then(result => {
        setPost(result as PostType)
      })
      .catch(err => toast({ title: 'Error', description: err || '', variant: 'destructive' }))
      .finally(() => setLoading(false))
  }

  useEffect(() => { !token && setToken(Cookies.get('token') || '') }, [])
  useEffect(() => { token && params.postId != 'addnew' && load() }, [token])

  return (<>
    {!loading &&
      <div className='flex flex-col  relative min-h-[80vh] pb-16'>
        <Card className="w-full ">
          <CardHeader className='pb-2 px-4'>
            <CardTitle className='space-y-2'>
              {params.postId == 'addnew' && <div>New Post</div>}
              {params.postId != 'addnew' && <div>Edit Post</div>}
              <div >
                <Textarea defaultValue={post.content} onChange={e => setPost({ ...post, content: e.target.value })} />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className='px-4 flex flex-col'>
            <ImageGallery
              editMode={params.postId != 'addnew'}
              defaultValue={post.images}
              onChange={(e) => {
                setPost({ ...post, images: e })
              }}
            />

          </CardContent>
          <CardFooter className='flex justify-between'>
            {/* <UploadImageButton /> */}
          </CardFooter>
        </Card>

        <div className='absolute bottom-0 end-0'>
          <div className='flex justify-end gap-4 w-full mt-4'>
            <Button size='sm' variant={'secondary'} onClick={() => cancelClick()}><ArrowLeftIcon /></Button>
            <Button size='sm' onClick={() => save()}><CheckIcon /></Button>

          </div>
        </div>
      </div>
    }
  </>)
}
