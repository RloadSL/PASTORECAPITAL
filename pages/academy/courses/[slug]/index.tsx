
import { CourseRepositoryInstance } from "infrastructure/repositories/courses.repository";
import CourseDetail from "ui/pages/academy/courses/CourseDetail/CourseDetail";

CourseDetail.getInitialProps = async (ctx) => {
const {courseId}:any = ctx.query;  
const res = await CourseRepositoryInstance.read(courseId)
  if(res){
    return {post : res?.toJson()}
  }
  return { notFound: true, revalidate: 300, post : null }
  
}

export default CourseDetail;

