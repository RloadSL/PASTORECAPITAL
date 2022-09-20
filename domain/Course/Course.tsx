import { CourseDto } from "infrastructure/dto/course.dto";
import { WP_EDIT_POST } from "infrastructure/wordpress/config";

export class Course {
  private _id: string;
  public get id(): string {
    return this._id;
  }


  private _wpID: number;
  public get wpID(): number {
    return this._wpID;
  }

  private _categories: Array<number>;
  public get categories(): Array<number> {
    return this._categories;
  }
  
  private _status: string;
  public get status(): string {
    return this._status;
  }
  private _excerpt: {
    rendered: string,
    raw: string
  }
  public get excerpt(): {
    rendered: string,
    raw: string
  } {
    return this._excerpt;
  };

  private _slug: string;
  public get slug(): string {
    return this._slug;
  };
  
  private _title: {
    rendered: string,
    raw: string
  };
  public get title(): {
    rendered: string,
    raw: string
  } {
    return this._title;
  };

  private _content?: {
    rendered: string,
    raw: string
  };
  public get content(): {
    rendered: string,
    raw: string
  } | undefined{
    return this._content;
  };
  /**
   * ISO Date convertir a new Date
   */
  private _created_at: Date
  public get created_at(): Date {
    return this._created_at;
  };
  constructor(courseData:CourseDto) {
    this._id = courseData.id.toString()
    this._wpID = courseData.id
    this._categories = courseData.categories
    this._status= courseData.status
    this._excerpt= courseData.excerpt,
    this._content = courseData.content,
    this._slug= courseData.slug,
    this._title = courseData.title
    this._created_at =   new Date(courseData.date)
  }

  public toJson = ():CourseDto => ({
    id : this._wpID ,
    categories  : this._categories,
    status: this._status,
    excerpt : this._excerpt,
    slug: this._slug,
    title : this._title,
    date : this._created_at,
    content: this._content
  });
}