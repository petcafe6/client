import { UserType } from './UserType'

export interface PostType {
  _id?: string
  author?: UserType
  content?: string
  images?: string[]
  location?: string
  likes?: UserType[]
  comments?: CommentType[]
  hashTags?: string[]
  mentions?: UserType[]
}

export interface CommentType {
  user?: UserType
  text?: string
  createdAt?: string
}