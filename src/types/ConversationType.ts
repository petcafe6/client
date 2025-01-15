import { GroupType } from './GroupType'
import { UserType } from './UserType'

export interface ConversationType {
  _id?: string
  type?: string | undefined | 'direct' | 'group'
  participants?: UserType[]
  user?: UserType
  group?: GroupType
}



export interface MessageType {
  _id?: string
  sender?: UserType
  conversation?: ConversationType
  content?: string
  media?: string[]
  isSystemMessage?: boolean
  isReadBy?: UserType[]
}