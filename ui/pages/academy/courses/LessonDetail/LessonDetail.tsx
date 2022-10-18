import style from './LessonDetail.module.scss'
import { PostDto } from 'infrastructure/dto/course.dto'
import { WP_EDIT_POST } from 'infrastructure/wordpress/config'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import parse from 'html-react-parser'
import ReadingProgressBar from 'components/ReadingProgressBar'
import CommentsList from 'components/Comments'
import CreateFormComment from 'components/Comments/components/CreateFormComment'
import SidebarCollapsable from 'components/SidebarCollapsable'
import ListLessons from '../ListLessons'
import ButtonApp from 'components/ButtonApp'
import iconDelete from '../../../../../assets/img/icons/trash.svg'
import iconEdit from '../../../../../assets/img/icons/pencil.svg'
import LinkApp from 'components/LinkApp'


const LessonDetail: NextPage<any> = ({ post }: { post: PostDto }) => {
  const router = useRouter()
  const loggedUser = useSelector(getUserLogged)
  /*  useEffect(() => {
     window.addEventListener('contextmenu', function (e) { 
       // do something here... 
       e.preventDefault(); 
     }, false);
   }, []) */

  const editLink = (token?: string) => {
    return token ? `${WP_EDIT_POST}?post=${post.id}&action=edit&?&token=${token}` : undefined;
  }

  return <LessonDetailView
    courseTitle={router.query.post_title as string}
    current_lesson={ parseInt(router.query.current_lesson as string)}
    post={post}
    editLink={editLink(loggedUser?.wpToken)}
  />
}

const LessonDetailView = ({
  post,
  courseTitle,
  editLink,
  current_lesson
}: {
  post: any
  editLink?: string
  current_lesson: number
  courseTitle: string
}) => {
  const contentRef = useRef<any>();

  const renderPaginator = (current_lesson:number)=>{
    
  }
  
  return (
    <div className={style.lessonPage} ref={contentRef}>
      <ReadingProgressBar target={contentRef} />
      <div className={style.readingContainer}>
        <div className={style.adminButtonsContainer}>
          {editLink ? (<LinkApp label={'edit'} linkStyle={'edit'} linkHref={editLink} icon={iconEdit} />) : null}
          {editLink ? (<ButtonApp labelID={'btn.delete'} onClick={() => ()=> console.log('borrar')} type='button' buttonStyle='delete' size='small' icon={iconDelete}/>) : null}
        </div>
        <div>
          <p className='small-caps'>{courseTitle}</p>
          <h1 className='main-title'>{post.title.rendered}</h1>
        </div>
        <div className={style.post}>{parse(post.content?.rendered || '')}</div>

        <CommentsList main={true} />
      </div>
      <SidebarCollapsable isCollapsed={true} label='LECCIONES'>
        <div className={style.lessonsSideBarContainer}>
          <span className={style.title}>Lecciones</span>
          <ListLessons formLessonDetail={true} lessons={post.lessons} listLessonsStyle={'sidebarLessons'}></ListLessons>
        </div>
      </SidebarCollapsable>
    </div>
  )
}

export default LessonDetail