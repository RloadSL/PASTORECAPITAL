import { useRouter } from 'next/router'
import style from './ListLessons.module.scss'
interface LISTLESSONSPROPS {
  lessons: Array<any>
  listLessonsStyle?: any
}

const ListLessons = ({ lessons, listLessonsStyle }: LISTLESSONSPROPS) => {
  const router = useRouter();

  const _navigate = (slug: string, id: string, lesson_title: string) => {
    const route = router.asPath.split('?')[0] + slug;
    router.push({
      pathname: route,
      query: {
        ...router.query,
        lesson_id: id,
        lesson_title
      }
    })
  }

  return <ListLessonsView navigate={_navigate} lessons={lessons} listLessonsStyle={listLessonsStyle} />
}

const ListLessonsView = ({ lessons, navigate, listLessonsStyle }: { lessons: any[], listLessonsStyle: any, navigate: Function }) => {
  return (
    <div className={`${style.lessons} ${listLessonsStyle ? style.sidebarLessons : ''}`} style={{ padding: '2%' }}>
      <ul className={style.lessonsList}>
        {lessons.map((l, index) => {
          return (
            <li key={index.toString()} id={`post-${l.id}`}>
              <div className={`flex-container space-between align-center ${style.listLinkContainer}`}>
                <div className={style.entryTitle}>
                  <div className={style.lessonNumber}>
                    <span>{l.lesson_number}</span>
                  </div>
                  <a onClick={() => navigate(l.slug, l.id, l.title)}>
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
