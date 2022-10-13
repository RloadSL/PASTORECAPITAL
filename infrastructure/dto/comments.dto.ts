import { User } from "domain/User/User"

export interface CommentDto {
  owner: string | User,
  parent: {
    path: string,
    id: string
  }
  id?: string,
  created_at: any,
  total_replays?: number,
  comment: string
}

