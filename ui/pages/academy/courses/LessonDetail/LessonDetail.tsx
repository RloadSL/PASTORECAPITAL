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
import iconArrow from '../../../../../assets/img/icons/arrow-circle.svg'

const LessonDetail: NextPage<any> = ({ post }: { post: PostDto }) => {
  const router = useRouter()
  const loggedUser = useSelector(getUserLogged)
  /*  useEffect(() => {
     window.addEventListener('contextmenu', function (e) { 
       // do something here... 
       e.preventDefault(); 
     }, false);
   }, []) */

  const _navigatePaginator = (slug: string, id: string, lesson_title: string, current_lesson: number) => {
    const route = `/academy/courses/${router.query['course-slug']}/` + slug;
    router.push({
      pathname: route,
      query: {
        ...router.query,
        lesson_id: id,
        'lesson-slug': slug,
        lesson_title,
        current_lesson,

      }
    })
  }

  const editLink = (token?: string) => {
    return token
      ? `${WP_EDIT_POST}?post=${post.id}&action=edit&?&token=${token}`
      : undefined
  }

  return (
    <LessonDetailView
      _navigatePaginator={_navigatePaginator}
      courseTitle={router.query.post_title as string}
      current_lesson={parseInt(router.query.current_lesson as string)}
      post={post}
      editLink={editLink(loggedUser?.wpToken)}
    />
  )
}

const LessonDetailView = ({
  post,
  courseTitle,
  editLink,
  current_lesson,
  _navigatePaginator
}: {
  post: any
  editLink?: string
  current_lesson: number
  courseTitle: string
  _navigatePaginator: Function
}) => {
  const contentRef = useRef<any>()

  const renderPaginator = () => {
    return (
      <div className={style.pagination}>
        {current_lesson > 0 && (
          <div className={style.before}>
            <ButtonApp icon={iconArrow} onClick={() => {
              const nextL = post.lessons[current_lesson - 1];
              _navigatePaginator(nextL.slug, nextL.id, nextL.title, current_lesson - 1)
            }} labelID='btn.paginator.before' buttonStyle={['primary', 'outlined']} size='small' />
          </div>
        )}
        {current_lesson < post.lessons.length - 1 && (
          <div className={style.next}>
            <ButtonApp icon={iconArrow} size='small' buttonStyle={['primary', 'outlined']} onClick={() => {
              const nextL = post.lessons[current_lesson + 1];
              _navigatePaginator(nextL.slug, nextL.id, nextL.title, current_lesson + 1)
            }} labelID='btn.paginator.next' />
          </div>
        )}
      </div>
    )
  }
  return (
    <div className={style.lessonPage} ref={contentRef}>
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
              onClick={() => console.log('borrar')}
              type='button'
              buttonStyle='delete'
              size='small'
              icon={iconDelete}
            />
          </div>
        )}
        <div className={style.headerLesson}>
          <p className='small-caps'>{courseTitle}</p>
          <h1 className='main-title'>{post.title.rendered}</h1>
        </div>
        <div className={style.post}>{parse(post.content?.rendered || '')}</div>
        {renderPaginator()}
        <CommentsList main={true} />
      </div>
      <SidebarCollapsable label='LECCIONES'>
        <div className={style.lessonsSideBarContainer}>
          <span className={style.title}>Lecciones</span>
          <ListLessons
            formLessonDetail={true}
            lessons={post.lessons}
            listLessonsStyle={'sidebarLessons'}
          ></ListLessons>
        </div>
      </SidebarCollapsable>
    </div>
  )
}

export default LessonDetail
