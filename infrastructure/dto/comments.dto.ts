import { User } from "domain/UserConsultant/User"

export interface CommentDto {
  owner: string | User,
  parent: ParentCommentDto,
  id?: string,
  created_at: any,
  total_replys: number,
  comment: string
}

export interface ParentCommentDto  {
    path?: string,
    id?: string
  }
  

