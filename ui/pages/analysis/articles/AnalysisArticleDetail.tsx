import ReadingProgressBar from 'components/ReadingProgressBar'
import { Post } from 'domain/Post/Post'
import { NextPage } from 'next'
import { Suspense, useEffect, useRef, useState } from 'react'
import { article } from 'ui/utils/test.data'
import style from './analysisArticleDetail.module.scss'
import parse from 'html-react-parser'
import WordpressHeader from 'WordpressHeader'
import SocialMediaButtons from 'components/SocialMediaButtons'
import { PostDto } from 'infrastructure/dto/post.dto'
import { useRouter } from 'next/router'
import { WP_EDIT_POST } from 'infrastructure/wordpress/config'
import { useSelector } from 'react-redux'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import LinkApp from 'components/LinkApp'
import ButtonApp from 'components/ButtonApp'

import iconEdit from '../../../../assets/img/icons/pencil.svg'
import iconDelete from '../../../../assets/img/icons/trash.svg'
import { FormattedMessage } from 'react-intl'
import AlertApp from 'components/AlertApp'
import { AnalysisRepositoryInstance } from 'infrastructure/repositories/analysis.repository'
import { LOGO_PASTORE_URL } from 'infrastructure/contants'

const AnalysisArticleDetail:NextPage<any> = ({post}:{post:PostDto}) => {
  const {wpToken} = useSelector(getUserLogged) || {}
  const { replace } = useRouter()
  const editLink = useRef<any>().current = wpToken
  ? `${WP_EDIT_POST}?post=${post.id}&action=edit&?&token=${wpToken}`
  : undefined


  const _onDeleteArt = async ()=>{
    if (wpToken){
      await AnalysisRepositoryInstance.deleteArticle(
        post.id,
        wpToken,
      )
      replace('/analysis', undefined, { shallow: true })
    }
  }

  return (
    <AnalysisArticleDetailView onDeleteArt={_onDeleteArt} post={new Post(post)} editLink={editLink}></AnalysisArticleDetailView>
  )
}

const AnalysisArticleDetailView = ({post, editLink, onDeleteArt}:{post:Post, editLink?:string, onDeleteArt: Function}) => {
  const contentRef = useRef<any>();
  const [deleteArticle, setDeleteArticle]: [
    { id: number; status: string } | null,
    Function
  ] = useState(null)
  // const { buildClassName } = useComponentUtils()

  // useEffect(() => {
  //   if (post) {
  //     const contentSidebar = document.querySelector('.gutentoc');
  //     contentSidebar?.classList.add('contentSidebar')
  //   }
  // }, [post])


  const {query, asPath} = useRouter();
  const router = useRouter()

  console.log(router)
  return (
    <div className={style.lessonPage} ref={contentRef}>
      <WordpressHeader title={post.title.rendered} metaDescription={post.excerpt.rendered} metaThumbnail={post.thumbnail_url || LOGO_PASTORE_URL}/>
      <ReadingProgressBar target={contentRef} />
      <div className={style.readingContainer}>
        {editLink && (
          <div className='admin-buttons-container'>
            <LinkApp
              label={'edit'}
              linkStyle={'edit'}
              linkHref={editLink}
              icon={iconEdit}
            />
            <ButtonApp
              labelID={'btn.delete'}
              onClick={() => setDeleteArticle({ id: post.id, status: post.status })}
              type='button'
              buttonStyle='delete'
              size='small'
              icon={iconDelete}
            />
          </div>
        )} 
        <div className={style.headerLesson}>
          <p className='small-caps'>{query.category_name}</p>
          <h1 className='main-title'>{post.title.rendered}</h1>
          <p className='author'>{post.author?.name} | <span className='date'>{'fecha'}</span></p>
        </div>
        <div className={style.post}>{parse(post.content?.rendered || '')}</div>
        <div className={style.socialSharing}>
          <SocialMediaButtons title={post.title.rendered} url={asPath} description={post.excerpt.rendered}/>
        </div>
      </div>
      {deleteArticle && (
        <Suspense>
          <AlertApp
            title='page.analysis.articles.form.remove.title'
            visible={deleteArticle}
            onAction={() => {
              onDeleteArt(deleteArticle)
            }}
            onCancel={() => setDeleteArticle(null)}
          >
            <p>
              <FormattedMessage id='page.analysis.articles.form.remove.content' />
            </p>
          </AlertApp>
        </Suspense>
      )}
    </div>
  )
}

export default AnalysisArticleDetail