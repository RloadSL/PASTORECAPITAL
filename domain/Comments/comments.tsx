import { User } from 'domain/User/User'
import { CommentDto } from 'infrastructure/dto/comments.dto'

export class Comments {
  constructor (comment: CommentDto) {
    this._id = comment.id
    this._owner = comment.owner
    this._parent = comment.parent
    this._created_at = comment.created_at.toDate()
    this._total_replays = comment.total_replays
    this._comment = comment.comment
  }

  private _id?: string
  public get id (): string | undefined {
    return this._id
  }

  private _owner: string | User
  public get owner (): string | User {
    return this._owner
  }

  private _parent: {
    path?: string
    id?: string
  }
  public get parent (): {
    path?: string
    id?: string
  } {
    return this._parent
  }

  private _created_at: any
  public get created_at (): any {
    return this._created_at
  }

  private _total_replays: number
  public get total_replays (): number  {
    return this._total_replays
  }

  private _comment: string
  public get comment (): string {
    return this._comment
  }

  toJson (): CommentDto {
    return {
      id: this._id,
      owner: this._owner,
      parent: this._parent,
      created_at: this._created_at,
      total_replays: this._total_replays,
      comment: this._comment
    }
  }
}
