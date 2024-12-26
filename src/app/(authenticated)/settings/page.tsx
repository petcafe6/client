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
import ThemeToggleButton from '@/components/theme-toggle-button'
import { ScrollArea } from '@/components/ui/scroll-area'
import SignOutButton from '../(components)/signout-button'


export default function MeEditPage() {
  const router = useRouter()
  const [token, setToken] = useState('')
  const { toast } = useToast()


  const save = () => {
    // postItem('/me/changePassword', token, { oldPassword, newPassword })
    //   .then(result => {
    //     toast({ description: 'Password changed', duration: 1000 })
    //     setTimeout(() => router.back(), 1000)
    //   })
    //   .catch(err => toast({ description: err || 'error', variant: 'destructive' }))
  }

  useEffect(() => {
    if (!token) setToken(Cookies.get('token') || '')
  }, [])

  return (<>

    <div className=" m11ax-w-3xl relative w-full min-h-[80vh] pb-16">

      {/* <ScrollArea className=''> */}
      <div className="flex flex-col mt-8 gap-4 h-full">
        <div className='flex items-center gap-4'>
          <Label>Color Theme</Label>
          <ThemeToggleButton />
        </div>
        <div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste pariatur blanditiis vero. Aliquam aliquid exercitationem voluptatum neque nam iusto cum libero quaerat recusandae iste. Illo, sequi. Ipsa optio consequatur voluptatum.</p>
        </div>
        <div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste pariatur blanditiis vero. Aliquam aliquid exercitationem voluptatum neque nam iusto cum libero quaerat recusandae iste. Illo, sequi. Ipsa optio consequatur voluptatum.</p>
        </div>
        <div className='flex items-center gap-4'>
          <Label>Sign Out</Label>
          <SignOutButton />
        </div>
      </div>
      {/* </ScrollArea> */}
      <div className='absolute bottom-0 end-0'>
        <div className='flex justify-end gap-4 w-full mt-4'>
          <Button size={'sm'} variant={'secondary'} onClick={() => router.back()} ><ArrowLeftIcon /></Button>

        </div>
      </div>

    </div>

  </>
  )
}
