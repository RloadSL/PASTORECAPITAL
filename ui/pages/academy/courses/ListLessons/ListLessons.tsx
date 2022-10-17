import { useRouter } from 'next/router'
import React from 'react'

//Los estilos vienen de Wp

const ListLessons = ({lessons}: { lessons: any[] }) => {
  const router = useRouter();

  const _navigate = (slug:string, id: string, lesson_title: string)=>{
    const route = router.asPath.split('?')[0]+slug;
    router.push({
      pathname: route,
      query: {
        ...router.query,
        lesson_id: id,
        lesson_title
      }  
    })
  }

  
  return <ListLessonsView navigate={_navigate} lessons={lessons} />
}

const ListLessonsView = ({ lessons, navigate }: { lessons: any[], navigate:Function }) => {
  console.log(lessons)
  return (
    <div className='lessons' style={{padding: '2%'}}>
      <ul className='lessons-list'>
        {lessons.map((l, index) => {
          return (
            <li key={index.toString()} id={`post-${l.id}`}>
              <div className='list-link-container flex-container space-between align-center'>
                <div className='entry-title'>
                  <div className='lesson-number'>
                    <span>{l.lesson_number}</span>
                  </div>
                  <div onClick={ () => navigate(l.slug, l.id, l.title)}>
                    <a>{l.title}</a>
                  </div>
                </div>
                <div>
                  {l.files && (
                    <a
                      className='download-resources'
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
