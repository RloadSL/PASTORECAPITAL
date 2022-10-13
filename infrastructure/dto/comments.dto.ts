import { User } from "domain/User/User"

export interface CommentDto {
  owner: string | User,
  parent: ParentCommentDto,
  id?: string,
  created_at: any,
  total_replays: number,
  comment: string
}

export interface ParentCommentDto  {
    path?: string,
    id?: string
  }
  

