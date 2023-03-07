import { getCookie } from "cookies-next";
import { AnalysisRepositoryInstance } from "infrastructure/repositories/analysis.repository";
import AnalysisArticleDetail from "ui/pages/analysis/articles/AnalysisArticleDetail";
AnalysisArticleDetail.getInitialProps = async (ctx) => {
  const {post_id}:any = ctx.query;  
  const {req, res} = ctx;
  const userData = getCookie('user-data', { req, res });
  const response = await AnalysisRepositoryInstance.getArticle(post_id, userData?.toString())
  
    if(response){
      return {post : response.toJson()}
    }
    return { post : null }
  }
export default AnalysisArticleDetail