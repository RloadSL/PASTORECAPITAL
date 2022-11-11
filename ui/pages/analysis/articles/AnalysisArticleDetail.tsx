import ReadingProgressBar from 'components/ReadingProgressBar'
import { Post } from 'domain/Post/Post'
import { NextPage } from 'next'
import { useRef } from 'react'
import { article } from 'ui/utils/test.data'
import style from './analysisArticleDetail.module.scss'
import parse from 'html-react-parser'
import WordpressHeader from 'WordpressHeader'
import SocialMediaButtons from 'components/SocialMediaButtons'
import { PostDto } from 'infrastructure/dto/post.dto'


const AnalysisArticleDetail:NextPage<any> = ({post}:{post:PostDto}) => {
  console.log(post)
  return (
    <AnalysisArticleDetailView post={new Post(post)}></AnalysisArticleDetailView>
  )
}

const AnalysisArticleDetailView = ({post}:{post:Post}) => {
  const contentRef = useRef<any>()
 
  return (
    <div className={style.lessonPage} ref={contentRef}>
      <WordpressHeader/>
      <ReadingProgressBar target={contentRef} />
      <div className={style.readingContainer}>
        {/* {editLink && (
          <div className='admin-buttons-container'>
            <LinkApp
              label={'edit'}
              linkStyle={'edit'}
              linkHref={editLink}
              icon={iconEdit}
            />
            <ButtonApp
              labelID={'btn.delete'}
              onClick={() => setDeleteLesson({ id: post.id, status: post.status })}
              type='button'
              buttonStyle='delete'
              size='small'
              icon={iconDelete}
            />
          </div>
        )} */}
        <div className={style.headerLesson}>
          <p className='small-caps'>{post.author?.name}</p>
          <h1 className='main-title'>{post.title.rendered}</h1>
        </div>
        <div className={style.post}>{parse(post.content?.rendered || '')}</div>
        <div><SocialMediaButtons></SocialMediaButtons></div>

        {/* {renderPaginator()} */}
      </div>
      {/* {deleteLesson && (
        <Suspense>
          <DeleteLesson data={deleteLesson} onClose={() => setDeleteLesson(null)}></DeleteLesson>
        </Suspense>
      )} */}
    </div>
  )
}

export default AnalysisArticleDetail