import { Post } from 'domain/Post/Post'
import { PostDto } from 'infrastructure/dto/course.dto'
import { NextPage } from 'next'
import { article } from 'ui/utils/test.data'

const postArticle = new Post(article as any)

const AnalysisArticles:NextPage<any> = () => {
  return (
    <AnalysisArticlesView></AnalysisArticlesView>
  )
}

const AnalysisArticlesView = () => {
  return (
    <div>Articles
      <h1>{postArticle.title.rendered}</h1>
    </div>
  )
}

export default AnalysisArticles