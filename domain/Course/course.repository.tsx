export abstract class CourseRepository {
  abstract create(course:any):Promise<any>;
}