import { Course } from "domain/Course/Course";
import { CourseRepository } from "domain/Course/course.repository";
import { Unsubscribe } from "firebase/firestore";
import { CourseDto } from "infrastructure/dto/course.dto";
import { PAGES } from "infrastructure/dto/wp.dto";
import FireFirestore  from "infrastructure/firebase/firestore.firebase";
import { createWpCourse } from "infrastructure/wordpress/academy/courses.wp";

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

  async create(course: PAGES, wpToken: string): Promise<any> {
      const response = await createWpCourse(course, wpToken)
      if(response instanceof Course) {

      }
  }

  async createCourse(course: PAGES, wpToken: string): Promise<any> {
    const response = await createWpCourse(course, wpToken)
    if(response instanceof Course) {
      const userSnap = await FireFirestore.setDoc(this.coursesPath,response.)

    }
}

  async read(uid: string): Promise<Course | null> {
    const userSnap = await FireFirestore.getDoc(this.coursesPath,uid)
    if(userSnap?.exists()){
      let courseData:CourseDto = {docID: userSnap?.id, ...userSnap?.data()} as CourseDto;
      return new Course(courseData as CourseDto);
    }else{
      return null;
    }
  }; 
  
  onChange(uid:string, callback:Function): Unsubscribe {
    return FireFirestore.onChangeDoc(`${this.coursesPath}/${uid}`, (courseData:CourseDto)=>{
      callback(new Course(courseData));
    })
  };

  async update(uid: string, data: CourseDto): Promise<void> {
    try {
      await FireFirestore.setDoc(this.coursesPath,uid, data)
    } catch (error) {
      console.error(error)
      alert('Error inteno en user.repository')
    }
  };
  
  async delete(uid: string): Promise<void> {
    try {
      await FireFirestore.deleteDoc(this.coursesPath,uid)
    } catch (error) {
      console.error(error)
      alert('Error inteno en user.repository')
    }
  };
}

export const CourseRepositoryInstance = CoursesRepositoryImpl.getInstance();