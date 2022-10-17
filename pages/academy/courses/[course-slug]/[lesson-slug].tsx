import { LessonRepositoryInstance } from "infrastructure/repositories/lessons.repository";
import LessonDetail from "ui/pages/academy/courses/LessonDetail/LessonDetail";

LessonDetail.getInitialProps = async (ctx) => {
  const {lessonId}:any = ctx.query;  
  
  const res = await LessonRepositoryInstance.read(lessonId)
    if(res){
      console.log(res)
      return {post : res?.toJson()}
    }
    return { post : null }
    
  }

export default LessonDetail;