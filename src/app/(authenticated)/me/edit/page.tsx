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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function MeEditPage() {
  const router = useRouter()
  const [token, setToken] = useState('')
  const [user, setUser] = useState<UserType>({})
  const [newLink, setNewLink] = useState('')
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [usernameErr, setUsernameErr] = useState(false)
  const [newUsername, setNewUsername] = useState('')
  // const [photoFileObject, setPhotoFileObject] = useState<FileList | null>(null)
  const [image, setImage] = useState<string[] | []>([])

  const save = () => {
    if (newUsername && usernameErr) {
      alert('username error.')
      return
    }
    if (newUsername && newUsername != user.username) {
      user.username = newUsername
      setUser({ ...user, username: newUsername })
    }
    console.log('user.username:', user.username)
    postItem('/me', token, user)
      .then(result => {
        Cookies.set('user', JSON.stringify(result))
        router.replace('/me')
      })
      .catch(err => toast({ description: err || 'error', variant: 'destructive' }))

  }

  const photoInputHandler = async (photoFileObject?: FileList) => {
    if (photoFileObject && token) {
      setLoading(true)
      uploadMultiToS3AliAbi(photoFileObject, "profiles/", ImageResizeFitType.contain, token)
        .then(result => {
          if (result.success) {
            setUser({ ...user, profilePicture: result.data[0]._id })
          } else {
            toast({ description: result.error || 'error', variant: 'destructive' })
          }
          console.log(result)
        })
        .catch(err => toast({ description: err || 'error', variant: 'destructive' }))
        .finally(() => setLoading(false))
    }
  }
  useEffect(() => {
    if (!token) setToken(Cookies.get('token') || '')
  }, [])
  useEffect(() => {
    if (token) {
      getItem('/me', token)
        .then(result => setUser(result))
        .catch(console.error)
    }
  }, [token])
  return (<>
    {user && <>
      <div className="w-full m11ax-w-3xl ">
        <div className="w-full flex justify-between items-start gap-2">
          <div className='relative'>
            <Avatar className="h-20 w-20">
              <AvatarImage src={image && image.length > 0 ? image[0] : user.profilePicture || '/placeholder-user.jpg'} alt="profilePicture" />
            </Avatar>
            <div className='absolute bottom-[-16px] start-6 w-8 h-8'>
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer  rounded-md font-medium text-primary-6000 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
              >
                <ImageUpIcon width={32} height={32} />
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  disabled={loading}
                  accept="image/*"
                  multiple={false}
                  onChange={(e) => {
                    if (e.target.files) {
                      photoInputHandler(e.target.files)
                      const imageUrls = Array.from(
                        e.target.files
                      ).map((file) => URL.createObjectURL(file))
                      setImage(imageUrls)
                    }
                  }}
                />
              </label>

            </div>
          </div>
          <div className='flex-grow flex flex-col gap-4 text-sm'>
            <div className='flex flex-row items-center gap-2'>
              <Input defaultValue={user.username} max={32}
                onChange={e => setNewUsername(e.target.value)}
                onBlur={e => {
                  if (e.target.value != user.username) {
                    getItem(`/auth/check/username/${e.target.value}`, token)
                      .then(result => {
                        if (result.inUse) {
                          setUsernameErr(true)
                        } else {
                          setUsernameErr(false)

                        }
                      })
                      .catch(err => toast({ description: err || 'error', variant: 'destructive' }))
                  }
                }}
              />
              <div className='w-10'>
                {usernameErr && <XIcon color='red' />}
                {!usernameErr && <CheckIcon />}
              </div>
            </div>

            <Label>{user.email}</Label>
          </div>

        </div>
        <div className="flex flex-col mt-8 gap-4">
          <div>
            <Label>Name</Label>
            <Input
              defaultValue={user.name || ''}
              onChange={e => setUser({ ...user, name: e.target.value })}
            />
          </div>
          <div>
            <Label>Bio</Label>
            <Textarea
              rows={3}
              defaultValue={user.bio || ''}
              onChange={e => setUser({ ...user, bio: e.target.value })}
            />
          </div>
          <div>
            <Label>Gender</Label>
            <Select
              value={user.gender || ''}
              onValueChange={e => setUser({ ...user, gender: e })}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="-" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {/* <SelectLabel>Fruits</SelectLabel> */}
                  <SelectItem value="-">Prefer not to say</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

          </div>
          <div>
            <Label>Date Of Birth</Label>
            <Input
              className='w-40'
              type={'date'}
              defaultValue={user.dateOfBirth || ''}
              onChange={e => setUser({ ...user, dateOfBirth: e.target.value })}
              pattern='yyyy-mm-dd'
            />
          </div>
        </div>
        <div className='flex justify-end gap-4 w-full mt-4'>
          <Button size={'sm'} variant={'secondary'} onClick={() => router.back()} ><ArrowLeftIcon /></Button>
          <Button size={'sm'} onClick={() => save()} ><CheckIcon /></Button>
        </div>
      </div>
    </>}
  </>
  )
}
