"use client"

import { useEffect, useState } from 'react'
import { getItem } from '@/lib/fetch'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { PetType } from '@/types/PetType'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Edit2Icon, EditIcon } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
import Loading from '@/components/loading'
import { s3ImageUrl } from '@/lib/utils'
interface Props {
}
export function MyPetList({ }: Props) {
  const [list, setList] = useState<PetType[]>([])
  const [token, setToken] = useState('')
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const load = () => {
    setLoading(true)
    getItem(`/myPets`, token)
      .then(result => {
        setList(result.docs as PetType[])
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
          <Card key={e._id} className="w-full">
            <CardHeader>
              <CardTitle className='relative'>
                {e.name}
                <div className='absolute end-[-24px] top-[-24px] cursor-pointer' onClick={() => router.push(`/me/pets/${e._id}`)}>
                  <EditIcon size={'24px'} />
                </div>
              </CardTitle>
              <CardDescription>
                <span>{e.type?.toUpperCase()}</span>
                {e.breed && <span> ({e.breed})</span>}
                , {e.gender} , {e.age} year(s) old
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Image
                src={e.images && e.images.length > 0 ? s3ImageUrl(e.images[0]) : '' || '/img/pet-holder.svg'}
                width={300}
                height={300}
                className='aspect-square object-cover'
                alt='pet-image'

              />
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
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