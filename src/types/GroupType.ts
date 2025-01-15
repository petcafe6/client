import { UserType } from './UserType'

export interface GroupType {
  _id?: string
  name?: string
  description?: string
  images?: string
  admins?: UserType[]
  members?: UserType[]
}