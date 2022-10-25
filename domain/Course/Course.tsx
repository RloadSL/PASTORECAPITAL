import { PostDto, WpCat, WpTerm } from 'infrastructure/dto/course.dto'
import { WP_EDIT_POST } from 'infrastructure/wordpress/config'
import tagIcon  from '../../assets/img/icons/tags.svg' 
import clock  from '../../assets/img/icons/clock.svg' 
const levels = ['basic', 'advanced', 'medium']
export class Course {
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

  public get level (): WpCat | undefined {
    return this._categories.find(item => levels.includes(item.slug))
  }

  private _tags: WpTerm[]
  public get tags (): WpTerm[] {
    return this._tags
  }

  private _lessons?: WpTerm[]
  public get lessons (): WpTerm[] | undefined {
    return this._lessons
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

  private _meta_post: any
  public get meta_post (): any {
    return this._meta_post
  }

  private _author: {username: string, uid: string} | undefined;
  public get author (): {username: string, uid: string} | undefined {
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
  constructor (courseData: PostDto) {
    this._id = courseData.id.toString()
    this._tags = courseData.tags
    this._lessons = courseData.lessons
    this._thumbnail_url = courseData.thumbnail_url
    this._wpID = courseData.id
    this._categories = courseData.categories
    this._status = courseData.status
    this._excerpt = courseData.excerpt
    this._content = courseData.content
    this._slug = courseData.slug
    this._title = courseData.title
    this._created_at = new Date(courseData.date)
    this._author = courseData.created_by
    this._meta_post = courseData.acf
  }

  public toJson = (): PostDto => ({
    id: this._wpID,
    categories: this._categories,
    lessons : this._lessons,
    status: this._status,
    excerpt: this._excerpt,
    slug: this._slug,
    title: this._title,
    date: this._created_at,
    content: this._content,
    thumbnail_url: this._thumbnail_url,
    tags: this._tags,
    created_by : this._author,
    acf: []
  })
}
