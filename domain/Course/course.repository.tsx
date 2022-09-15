export abstract class CourseRepository {
  abstract create(course:any, wpToken: string):Promise<any>;
}