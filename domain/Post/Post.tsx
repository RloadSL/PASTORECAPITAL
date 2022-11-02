import { PostDto, WpCat, WpTerm } from 'infrastructure/dto/course.dto'

export class Post {
  private _id: string
  public get id (): string {
    return this._id
  }

  private _wpID: number
  public get wpID (): number {
    return this._wpID
  }

  private _categories: WpCat[]
  public get categories (): WpCat[] {
    return this._categories
  }

  private _tags: WpTerm[]
  public get tags (): WpTerm[] {
    return this._tags
  }

  private _status: string
  public get status (): string {
    return this._status
  }
  private _excerpt: {
    rendered: string
    raw: string
  }
  public get excerpt (): {
    rendered: string
    raw: string
  } {
    return this._excerpt
  }

  private _lessons?: WpTerm[]
  public get lessons (): WpTerm[] | undefined {
    return this._lessons
  }

  private _thumbnail_url: string
  public get thumbnail_url (): string {
    return this._thumbnail_url
  }

  private _slug: string
  public get slug (): string {
    return this._slug
  }

  private _title: {
    rendered: string
    raw: string
  }
  public get title (): {
    rendered: string
    raw: string
  } {
    return this._title
  }
  private _author: {username: string, uid: string , name:string} | undefined;
  public get author (): {username: string, uid: string, name:string} | undefined {
    return this._author
  }
  private _content?: {
    rendered: string
    raw: string
  }
  public get content ():{
        rendered: string
        raw: string
      }
    | undefined {
    return this._content
  }
  
  /**
   * ISO Date convertir a new Date
   */
  private _created_at: Date
  public get created_at (): Date {
    return this._created_at
  }
  constructor (post: PostDto) {
    this._id = post.id.toString()
    this._tags = post.formatted_tags
    this._thumbnail_url = post.thumbnail_url
    this._wpID = post.id
    this._categories = post.formatted_categories
    this._status = post.status
    this._excerpt = post.excerpt
    this._content = post.content
    this._slug = post.slug
    this._title = post.title
    this._created_at = new Date(post.date)
    this._lessons = post.lessons
    this._author = post.created_by
  }

  public toJson = (): PostDto => ({
    id: this._wpID,
    formatted_categories: this._categories,
    status: this._status,
    excerpt: this._excerpt,
    slug: this._slug,
    title: this._title,
    date: this._created_at,
    content: this._content,
    thumbnail_url: this._thumbnail_url,
    formatted_tags: this._tags,
    lessons : this._lessons,
    acf: [],
    created_by: this._author
  })
}
