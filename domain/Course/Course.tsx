import { CourseDto } from "infrastructure/dto/course.dto";

export class Course {
  private _id: string;
  public get id(): string {
    return this._id;
  }
 
  constructor(courseData:CourseDto) {
    this._id = courseData.id
  }

  public toJson = ():CourseDto => ({
    id: this.id
  });
}