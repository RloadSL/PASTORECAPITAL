import { useRouter } from 'next/router'
import style from './ListLessons.module.scss'
interface LISTLESSONSPROPS {
  lessons: Array<any>
  listLessonsStyle?: any,
  formLessonDetail?:boolean
}

const ListLessons = ({ formLessonDetail ,lessons, listLessonsStyle }: LISTLESSONSPROPS) => {
  const router = useRouter();

  const _navigate = (slug: string, id: string, lesson_title: string, current_lesson: number) => {
    const route = `/academy/courses/${router.query['course-slug']}/` + (!formLessonDetail ?  slug : router.query['lesson-slug']);
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

  return <ListLessonsView current_lesson={parseInt(router.query.current_lesson?.toString() as string)} navigate={_navigate} lessons={lessons} listLessonsStyle={listLessonsStyle} />
}

const ListLessonsView = ({ lessons, navigate, listLessonsStyle , current_lesson}: { lessons: any[], listLessonsStyle: any, navigate: Function, current_lesson?: number }) => {
  
  return (
    <div className={`${style.lessons} ${listLessonsStyle ? style.sidebarLessons : ''}`} style={{ padding: '2%' }}>
      <h2 className={style.title}>Lecciones</h2>
      <ul className={style.lessonsList}>
        {lessons.map((l, index) => {
          return (
            <li key={index.toString()} id={`post-${l.id}`}>
              <div className={`flex-container space-between align-center ${style.listLinkContainer} ${index === current_lesson ? style.active : ''}`}>
                <div className={style.entryTitle}>
                  <div className={style.lessonNumber}>
                    <span>{l.lesson_number}</span>
                  </div>
                  <a onClick={() => navigate(l.slug, l.id, l.title, index)}>
                    <span>{l.title}</span>
                  </a>
                </div>
                <div className={style.downloadResources}>
                  {l.files && (
                    <a
                      className={style.downloadFilesButton}
                      href={l.files}
                      target='_blank'
                      rel='noopener noreferrer'
                      download
                    >
                      <span className='only-readers'>descargar recursos</span>
                    </a>
                  )}
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default ListLessons
