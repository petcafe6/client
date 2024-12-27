import { UserType } from './UserType'

export interface PostType {
  _id?: string
  author?: UserType
  content?: string
  images?: string[]
  location?: string
  likes?: UserType[]
  comments?: CommentType[]
  hashtags?: string[]
  mentions?: UserType[]
  createdAt?: string

  liked?: boolean
}

export interface CommentType {
  user?: UserType
  text?: string
  createdAt?: string
}