import { User } from "domain/User/User"

export interface CommentDto {
  owner: string | User,
  parent: ParentCommentDto,
  id?: string,
  created_at: any,
  total_replys: number,
  comment: string,
  answered?:boolean,
  owner_role_level?:number,
  metadata?:any,
  path?:string,
}

export interface ParentCommentDto  {
    path?: string,
    id?: string
  }
  

