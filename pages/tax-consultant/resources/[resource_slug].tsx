import taxConsultantResourcesRepository from "infrastructure/repositories/taxConsultantResources.repository";
import ResourceDetail from "ui/pages/tax-consultant/resources/ResourceDetail/ResourceDetail";

ResourceDetail.getInitialProps = async (ctx) => {
  const {post_id}:any = ctx.query;  
  
  const res = await taxConsultantResourcesRepository.read(post_id)
    if(res){
      return {post : res?.toJson()}
    }
    return { post : null }
  }


export default ResourceDetail