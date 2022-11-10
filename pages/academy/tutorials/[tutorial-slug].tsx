import { TutorialRepositoryInstance } from "infrastructure/repositories/tutorials.repository";
import TutorialDetail from "ui/pages/academy/tutorials/TutorialDetail/TutorialDetail";

TutorialDetail.getInitialProps = async (ctx) => {
  const {post_id}:any = ctx.query;  
  
  const res = await TutorialRepositoryInstance.read(post_id)
    if(res){
      return {post : res?.toJson()}
    }
    return { post : null }
  }

  export default TutorialDetail;