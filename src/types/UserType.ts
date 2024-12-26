export interface UserType {
  _id?: string
  username?: string
  email?: string
  phoneNumber?: string
  role?: string
  passive?: boolean
  name?: string
  gender?: string | undefined | '-' | 'male' | 'female' | 'other'
  dateOfBirth?: string
  profilePicture?: any
  bio?: string
  location?: string
  postCount?: number
  followerCount?: number
  followingCount?: number
}