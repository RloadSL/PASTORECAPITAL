import { Course } from "domain/Course/Course";
import { CourseRepository } from "domain/Course/course.repository";
import { ErrorApp } from "domain/ErrorApp/ErrorApp";
import { Post } from "domain/Post/Post";
import { HTTP } from "infrastructure/http/http";
import { createWpCourse, deleteWpCourse } from "infrastructure/wordpress/academy/courses.wp";
import { WP_API_PAGES, WP_API_POST } from "infrastructure/wordpress/config";
import { getAllPagesFromServer, getAllPostsFromServer, getCategories, getCategoryAcademy, getPageFromServer } from "infrastructure/wordpress/wp.utils";

class LessonsRepositoryImpl {
  private static instance: LessonsRepositoryImpl;
  readonly coursesPath = 'courses';
  private constructor() {

  };

  public static getInstance(): LessonsRepositoryImpl {
    if (!LessonsRepositoryImpl.instance) {
      LessonsRepositoryImpl.instance = new LessonsRepositoryImpl();
    }
    return LessonsRepositoryImpl.instance;
  }

  create = async (lesson: { title: string, excerpt: string, courseCat?: number }, wpToken: string) => {
    let primaryCat = await getCategoryAcademy('lessons', wpToken)
    const {courseCat} = lesson;
    delete lesson.courseCat;
    const arg = {
      ...lesson,
      status: 'private',
      content: '<p>Contenido de la lección aquí....</p>',
      categories: [courseCat, primaryCat],
      parent_category_id: courseCat

    }
   
    const res = await HTTP.post(WP_API_POST, arg, { Authorization: `Bearer ${wpToken}` })
    if (res.data.id) {
      return new Post({ ...res.data, wpID: res.data.id });
    } else {
      return res.errCode;
    }
  }

  async read(id: string): Promise<Post | undefined> {
    try {
    const res = await HTTP.get(`${WP_API_POST}/${id}`);
    if(res) return new Post(res);
    else return undefined
  } catch (error) {
    console.error('async read',`${WP_API_POST}/${id}`);
    return undefined;
  }
    
  };


  async delete(id: number, wpToken: string): Promise<void> {
    try {
      const deleted = await HTTP.delete(WP_API_POST+`/${id}?force=true`, {Authorization: `Bearer ${wpToken}`})
      return deleted.data;
    } catch (error) {
      console.error(error)
      alert('Error inteno en user.repository')
    }
  };
}

export const LessonRepositoryInstance = LessonsRepositoryImpl.getInstance();