import { Course } from "domain/Course/Course";
import { CourseRepository } from "domain/Course/course.repository";
import { DocumentSnapshot, Unsubscribe } from "firebase/firestore";
import { CourseDto } from "infrastructure/dto/course.dto";
import { PAGES } from "infrastructure/dto/wp.dto";
import FireFirestore  from "infrastructure/firebase/firestore.firebase";
import { parseFirestoreDocs } from "infrastructure/firebase/utils";
import { createWpCourse } from "infrastructure/wordpress/academy/courses.wp";
import { getAllPagesFromServer, getAllPostsFromServer, getPageFromServer } from "infrastructure/wordpress/wp.utils";

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

  async create(course: PAGES, wpToken: string): Promise<Course | undefined> {
    const response = await createWpCourse(course, wpToken)
    console.log('response', response)
    if(response instanceof Course) {
      const newCourse = await FireFirestore.setDoc(this.coursesPath,response.wpID.toString(), response.toJson());
      console.log('newCourse', newCourse)
      return response;
    }else{
      alert('Error interno')
    }
}

  async read(id: string): Promise<Course | null> {
    const response = await getPageFromServer(id)
    return new Course(response);
  }; 

  async readCollection(lastSnapShot?: DocumentSnapshot): Promise<Course[] | undefined> {
    const snap = await FireFirestore.getCollectionDocs(this.coursesPath, lastSnapShot);
    const parsedDocs = snap ? parseFirestoreDocs(snap) : [];
    return parsedDocs.map(item => new Course(item));
  }; 

  async readFromWp(): Promise<any> {
    const response = await getAllPagesFromServer()
    return response.map((item:any) => new Course(item));
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