import { UserType } from './UserType'

export interface PetType {
  _id?: string
  owner?: UserType
  name?: string
  type?: string | undefined | 'dog' | 'cat' | 'bird' | 'reptile' | 'fish' | 'goat' | 'sheep' | 'cow' | 'turtle' | 'rabbit' | 'hamster' | 'snake' | 'horse' | 'iguana' | 'monkey' | 'rooster' | 'other'
  breed?: string
  age?: number
  gender?: string | 'male' | 'female'
  idNumber?: string
  images?: string[]
  listImage?: string
  medicalRecords?: MedicalRecordType[]
}

export interface MedicalRecordType {
  date?: string
  notes?: string
  vet?: UserType
}