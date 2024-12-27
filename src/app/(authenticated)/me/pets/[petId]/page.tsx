"use client"

import { useEffect, useState } from 'react'
import { getItem, postItem, putItem } from '@/lib/fetch'
import { PetType } from '@/types/PetType'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { useToast } from '@/components/ui/use-toast'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { SelectPetType } from '@/components/select-pettype'
import { cNumber } from '@/lib/utils'
import { SelectPetGender } from '@/components/select-petgender'
import { ArrowLeftIcon, CheckCheckIcon, CheckIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ImageGallery } from '../../../(components)/image-gallery'

interface Props {
  params: {
    petId: string
  }
}
export default function PetPage({ params }: Props) {
  const [token, setToken] = useState('')
  const [pet, setPet] = useState<PetType>({})
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const save = () => {
    setLoading(true)
    if (params.petId == 'addnew') {
      postItem(`/myPets`, token, pet)
        .then(result => router.back())
        .catch(err => toast({ title: 'Error', description: err || '', variant: 'destructive' }))
        .finally(() => setLoading(false))
    } else {
      putItem(`/myPets/${params.petId}`, token, pet)
        .then(result => router.back())
        .catch(err => toast({ title: 'Error', description: err || '', variant: 'destructive' }))
        .finally(() => setLoading(false))
    }

  }
  const load = () => {
    setLoading(true)
    getItem(`/myPets/${params.petId}`, token)
      .then(result => {
        setPet(result as PetType)
      })
      .catch(err => toast({ title: 'Error', description: err || '', variant: 'destructive' }))
      .finally(() => setLoading(false))
  }

  useEffect(() => { !token && setToken(Cookies.get('token') || '') }, [])
  useEffect(() => { token && params.petId != 'addnew' && load() }, [token])

  return (<>
    {!loading &&
      <div className='flex flex-col w-full gap-4 relative min-h-[80vh] pb-16'>
        {params.petId == 'addnew' && <h2>myPets Add New Pet</h2>}
        <div className='max-w-xl'>
          <Label>Name</Label>
          <Input defaultValue={pet.name} onChange={e => setPet({ ...pet, name: e.target.value })} />
        </div>
        <div className='flex justify-start gap-4'>
          <div className='w-40'>
            <Label>Type</Label>
            <SelectPetType defaultValue={pet.type} onChange={e => setPet({ ...pet, type: e })} />
          </div>
          <div className='max-w-md w-full'>
            <Label>Breed</Label>
            <Input defaultValue={pet.breed} onChange={e => setPet({ ...pet, breed: e.target.value })} />
          </div>
        </div>
        <div className='flex justify-start gap-4'>
          <div className='w-40'>
            <Label>Gender</Label>
            <SelectPetGender defaultValue={pet.gender} onChange={e => setPet({ ...pet, gender: e })} />
          </div>
          <div className='w-40'>
            <Label>Age</Label>
            <Input
              type='number'
              defaultValue={pet.age}
              onChange={e => setPet({ ...pet, age: cNumber(e.target.value) })}
              onFocus={e => e.target.select()}
            />
          </div>
        </div>
        <div className='max-w-xl'>
          <Label>ID Number</Label>
          <Input defaultValue={pet.idNumber} onChange={e => setPet({ ...pet, idNumber: e.target.value })} />
        </div>

        <div className='absolute bottom-0 end-0'>
          <div className='flex justify-end gap-4 w-full mt-4'>
            <Button size={'sm'} variant={'secondary'} onClick={() => router.back()} ><ArrowLeftIcon /></Button>
            <Button size={'sm'} onClick={() => save()} ><CheckIcon /></Button>

          </div>
        </div>
        <ImageGallery
          defaultValue={pet.images}
          onChange={e => setPet({ ...pet, images: e })}
        />
      </div>
    }
  </>)
}
