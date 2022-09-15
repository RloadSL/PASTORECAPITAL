import { CourseRepository } from "domain/Course/course.repository";
import { createWpCourse } from "infrastructure/wordpress/academy/courses.wp";

class CoursesRepositoryImpl extends CourseRepository{
  private static instance: CoursesRepositoryImpl;
  private constructor(){
    super()
  };
  public static getInstance(): CoursesRepositoryImpl {
    if (!CoursesRepositoryImpl.instance) {
      CoursesRepositoryImpl.instance = new CoursesRepositoryImpl();
    }
    return CoursesRepositoryImpl.instance;
  }
  
  create(course: any): Promise<any> {
      return createWpCourse(course)
  }
}

export const CourseRepositoryInstance = CoursesRepositoryImpl.getInstance();