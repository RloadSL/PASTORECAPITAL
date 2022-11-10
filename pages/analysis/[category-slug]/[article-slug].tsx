import { AnalysisRepositoryInstance } from "infrastructure/repositories/analysis.repository";
import AnalysisArticleDetail from "ui/pages/analysis/articles/AnalysisArticleDetail";
AnalysisArticleDetail.getInitialProps = async (ctx) => {
  const {post_id}:any = ctx.query;  
  
  const res = await AnalysisRepositoryInstance.getArticle(post_id)
  
    if(res){
      return {post : res.toJson()}
    }
    return { post : null }
  }
export default AnalysisArticleDetail