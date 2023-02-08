import { Course } from "domain/Course/Course";
import { CourseRepository } from "domain/Course/course.repository";
import { ErrorApp } from "domain/ErrorApp/ErrorApp";
import { createWpCourse, deleteWpCourse } from "infrastructure/wordpress/academy/courses.wp";
import { getAllPagesFromServer, getAllPostsFromServer, getCategories, getPageFromServer } from "infrastructure/wordpress/wp.utils";

class CoursesRepositoryImpl extends CourseRepository{
  private static instance: CoursesRepositoryImpl;
  readonly coursesPath = 'courses';
  private constructor(){
    super()
  };
  
  public static getInstance(): CoursesRepositoryImpl {
    if (!CoursesRepositoryImpl.instance) {
      CoursesRepositoryImpl.instance = new CoursesRepositoryImpl();
    }
    return CoursesRepositoryImpl.instance;
  }

  async create(course: any, wpToken: string): Promise<Course | ErrorApp> {
    const response = await createWpCourse(course, wpToken)
    if(response instanceof Course) {
      return response;
    }else{
      const err = `course.academy@${response}` || 'error.interno';
      return new ErrorApp({errorCode: err, errorMessage: err }) ;
    }
  } 

  async read(id: string): Promise<Course | null> {
    const response = await getPageFromServer(id)
    if(!response) return null;
    return new Course(response);
  }; 

  async readFromWp(offset?:number,filters?:any, wpToken?:string ): Promise<Course[]> {
    const response = await getAllPagesFromServer(offset,filters, wpToken)
    return response.map((item:any) => new Course(item));
  };

  async readLevelsCategoriesFromWp(): Promise<Course[]> {
    const response = await getCategories('levels')
    const levels = response.find((item:any) => item.slug == 'levels').children;
    return levels.map((item:any) => ({value: item.slug, label: item.name, id: item.term_id}));
  };

  async delete(id: number, wpToken:string): Promise<void> {
    try {
        await deleteWpCourse(id,wpToken);
    } catch (error) {
      console.error(error)
      console.error('Error inteno en user.repository')
    }
  };
}

export const CourseRepositoryInstance = CoursesRepositoryImpl.getInstance();