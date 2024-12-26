"use client"
import { Button } from '@/components/ui/button'
import Image from "next/image"
import { redirect, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { getItem, postItem } from '@/lib/fetch'
import CustomLink from '@/components/custom-link'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { UserType } from '@/types/UserType'
import { ArrowLeftIcon, Check, CheckIcon, EditIcon, ImageUpIcon, UploadIcon, XIcon } from 'lucide-react'
import { ImageResizeFitType, uploadMultiToS3AliAbi, uploadSingleToS3AliAbi } from '@/lib/s3BucketHelper'
import { useToast } from '@/components/ui/use-toast'


export default function MeEditPage() {
  const router = useRouter()
  const [token, setToken] = useState('')
  const { toast } = useToast()
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [rePassword, setRePassword] = useState('')

  const save = () => {
    postItem('/me/changePassword', token, { oldPassword, newPassword })
      .then(result => {
        toast({ description: 'Password changed', duration: 1000 })
        setTimeout(() => router.back(), 1000)
      })
      .catch(err => toast({ description: err || 'error', variant: 'destructive' }))
  }

  useEffect(() => {
    if (!token) setToken(Cookies.get('token') || '')
  }, [])
  // useEffect(() => {
  //   if (token) {
  //     getItem('/me', token)
  //       .then(result => setUser(result))
  //       .catch(console.error)
  //   }
  // }, [token])
  return (<>

    <div className="w-full m11ax-w-3xl ">

      <div className="flex flex-col mt-8 gap-4">
        <div>
          <Label>Old Password</Label>
          <Input
            type='password'
            defaultValue={oldPassword}
            onChange={e => setOldPassword(e.target.value)}
          />
        </div>
        <div>
          <Label>New Password</Label>
          <Input
            type='password'
            defaultValue={newPassword}
            onChange={e => setNewPassword(e.target.value)}
          />
        </div>
        <div>
          <Label>Re-type New Password</Label>
          <Input
            type='password'
            defaultValue={rePassword}
            onChange={e => setRePassword(e.target.value)}
          />
        </div>
      </div>
      <div className='flex justify-end gap-4 w-full mt-4'>
        <Button size={'sm'} variant={'secondary'} onClick={() => router.back()} ><ArrowLeftIcon /></Button>
        <Button
          disabled={!(newPassword && rePassword == newPassword && newPassword.length >= 8)}
          size={'sm'}
          onClick={() => save()}
        ><CheckIcon /></Button>
      </div>
    </div>

  </>
  )
}
