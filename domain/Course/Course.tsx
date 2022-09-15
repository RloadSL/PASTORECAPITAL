import { CourseDto } from "infrastructure/dto/course.dto";

export class Course {
  private _docID: string;
  public get docID(): string {
    return this._docID;
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
  /**
   * ISO Date convertir a new Date
   */
  private _created_at: Date
  public get created_at(): Date {
    return this._created_at;
  };
  constructor(courseData:CourseDto) {
    this._docID = courseData.docID
    this._wpID = courseData.wpID
    this._categories = courseData.categories
    this._status= courseData.status
    this._excerpt= courseData.excerpt
    this._slug= courseData.slug,
    this._title = courseData.title
    this._created_at = new Date(courseData.created_at)
  }

  public toJson = ():CourseDto => ({
    docID: this._docID,
    wpID : this._wpID ,
    categories  : this._categories,
    status: this._status,
    excerpt : this._excerpt,
    slug: this._slug,
    title : this._title,
    created_at : this._created_at
  });
}