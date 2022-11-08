import ReadingProgressBar from 'components/ReadingProgressBar'
import { Post } from 'domain/Post/Post'
import { PostDto } from 'infrastructure/dto/course.dto'
import { NextPage } from 'next'
import { useRef } from 'react'
import { article } from 'ui/utils/test.data'
import style from './analysisArticleDetail.module.scss'
import parse from 'html-react-parser'
import WordpressHeader from 'WordpressHeader'
import SocialMediaButtons from 'components/SocialMediaButtons'

const postArticle = new Post(article as any)

const AnalysisArticleDetail:NextPage<any> = () => {
  return (
    <AnalysisArticleDetailView></AnalysisArticleDetailView>
  )
}

const AnalysisArticleDetailView = () => {
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
          <p className='small-caps'>{'titular'}</p>
          <h1 className='main-title'>{postArticle.title.rendered}</h1>
        </div>
        <div className={style.post}>{parse(postArticle.content?.rendered || '')}</div>
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