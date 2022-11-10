import style from './TutorialDetail.module.scss'
import { PostDto } from 'infrastructure/dto/post.dto'
import { WP_EDIT_POST } from 'infrastructure/wordpress/config'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import parse from 'html-react-parser'
import ReadingProgressBar from 'components/ReadingProgressBar'
/* import CommentsList from 'components/Comments' */
import SidebarCollapsable from 'components/SidebarCollapsable'
import ButtonApp from 'components/ButtonApp'
import LinkApp from 'components/LinkApp'
import iconEdit from '../../../../../assets/img/icons/pencil.svg'
import iconDelete from '../../../../../assets/img/icons/trash.svg'
import DeleteTutorial from '../Tutorials/components/DeleteTutorial'
import WordpressHeader from 'WordpressHeader'


const TutorialDetail: NextPage<any> = ({ post }: { post: PostDto }) => {
  const router = useRouter()
  const loggedUser = useSelector(getUserLogged)
  /*  useEffect(() => {
     window.addEventListener('contextmenu', function (e) { 
       // do something here... 
       e.preventDefault(); 
     }, false);
   }, []) */
  useEffect(() => {
    if (!post) {
      router.replace('/academy/tutorials')
    }
  }, [post])

  const editLink = (token?: string) => {
    return token ? `${WP_EDIT_POST}?post=${post.id}&action=edit&?&token=${token}` : undefined;
  }

  return post ? <LessonDetailView
    courseTitle={router.query.courseTitle as string}
    ispublisherized={loggedUser?.wpToken != null}
    post={post}
    editLink={editLink(loggedUser?.wpToken)}
  /> : <></>
}

const LessonDetailView = ({
  post,
  courseTitle,
  ispublisherized,
  editLink,

}: {
  post: any
  ispublisherized: boolean
  editLink?: string,
  courseTitle: string

}) => {
  const contentRef = useRef<any>();
  const [deleteTutorial, setDeleteTutorial]: [{ id: number, status: string } | null, Function] = useState(null)

  return (
    <div className={style.lessonPage} ref={contentRef}>
     <WordpressHeader/>
      <ReadingProgressBar target={contentRef} />
      <div className={style.readingContainer}>
        {post && editLink ? (
          <div className='admin-buttons-wrapper'>
            <div className='admin-buttons-container'>
              <LinkApp label={'edit'} linkStyle={'edit'} linkHref={editLink} icon={iconEdit} />
              <ButtonApp labelID={'btn.delete'} onClick={() => setDeleteTutorial({ id: post.id, status: post.status })} type='button' buttonStyle='delete' size='small' icon={iconDelete} />
            </div>
          </div>
        ) : null}
        <div>
          <p className='small-caps'>{courseTitle}</p>
          <h1 className='main-title'>{post.title.rendered}</h1>
        </div>
        <div className={style.post}>{parse(post.content?.rendered || '')}</div>
      </div>
      {deleteTutorial && (
        <Suspense>
          <DeleteTutorial data={deleteTutorial} onClose={() => setDeleteTutorial(null)} />
        </Suspense>
      )}
    </div>
  )
}

export default TutorialDetail;