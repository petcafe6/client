export interface UserType {
  _id?: string
  username?: string
  email?: string
  phoneNumber?: string
  role?: string
  passive?: boolean
  title?: string
  name?: string
  gender?: '' | 'male' | 'female' | 'other'
  dateOfBirth?: string
  profilePicture?: any
  bio?: string
  location?: string

}