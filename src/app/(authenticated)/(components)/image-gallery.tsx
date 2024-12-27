"use client"

import { useEffect, useState } from 'react'
import { getItem } from '@/lib/fetch'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { useToast } from '@/components/ui/use-toast'
import { ImageResizeFitType, uploadMultiToS3AliAbi } from '@/lib/s3BucketHelper'
import { CheckCircleIcon, ImagePlusIcon, ImageUpIcon, Trash2Icon } from 'lucide-react'
import { s3ImageUrl } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface Props {
  // images?: string[]
  defaultValue?: string[]
  onChange?: (e: string[]) => void
  editMode?: boolean
}
export function ImageGallery({ defaultValue, onChange, editMode }: Props) {
  const [images, setImages] = useState<string[]>(defaultValue || [])
  const [token, setToken] = useState('')
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const router = useRouter()


  const addNewS3Image = async (photoFileObject?: FileList) => {
    if (photoFileObject && token) {
      setLoading(true)
      uploadMultiToS3AliAbi(photoFileObject, "profiles/", ImageResizeFitType.contain, token)
        .then(result => {
          if (result.success) {
            images.push(result.data[0]._id)
            setImages(images)
            onChange && onChange(images)
          } else {
            toast({ description: result.error || 'error', variant: 'destructive' })
          }
        })
        .catch(err => toast({ description: err || 'error', variant: 'destructive' }))
        .finally(() => setLoading(false))
    }
  }

  const UploadImageButton = () => {
    return (<>
      <label
        htmlFor="file-upload"
        className="relative cursor-pointer  rounded-md font-medium text-primary-6000 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
      >
        <ImagePlusIcon width={32} height={32} />
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
              addNewS3Image(e.target.files)
            }
          }}
        />
      </label>
    </>)
  }

  const removeImage = (index: number) => {
    if (confirm(`Do you want to remove image?`)) {
      images.splice(index, 1)
      setImages(images)
      onChange && onChange(images)
    }
  }
  const makeProfile = (index: number) => {
    images.unshift(images.splice(index, 1)[0])
    setImages(images)
    onChange && onChange(images)
  }
  useEffect(() => { !token && setToken(Cookies.get('token') || '') }, [])
  // useEffect(() => { token && load() }, [token])

  return (<>
    <div className='flex flex-col gap-2'>
      {/* duzeltme isleminde yeni image eklenemez. */}
      {/* sebep: eski fotoya begeni yapmis olanlarin kullanim tercihlerini korumak. */}
      {/* Yeni image kotu niyetli olabilir. */}
      {!editMode &&
        <div className='w-full h-full flex flex-1 justify-center items-center'>
          <UploadImageButton />
        </div>
      }
      <div className='grid grid-cols-2 gap-2'>
        {images && images.map((e, index) =>
          <div key={`image-${index}`} className='p-1 relative'>
            <img
              src={s3ImageUrl(e) || '/img/pet-holder.svg'}
              alt='image'
              className='aspect-square object-cover rounded-md'
            />
            <div className='absolute bottom-0 w-full flex justify-center cursor-pointer'
              onClick={() => removeImage(index)}
            >
              <Trash2Icon color={'red'} />
            </div>
            {index > 0 &&
              <div className='absolute top-0 right-0 cursor-pointer'
                onClick={() => makeProfile(index)}
              >
                <CheckCircleIcon />
              </div>
            }
          </div>
        )}

      </div>
    </div>
  </>)
}