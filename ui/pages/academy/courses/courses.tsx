
import { PAGES } from 'infrastructure/dto/wp.dto'
import { CourseRepositoryInstance } from 'infrastructure/repositories/courses.repository'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
const Courses = () => {
  const userLogged = useSelector(getUserLogged)
  
  const getCourses = async ()=>{

  }

  const createCourses = async (name: string):Promise<any> => {
    const courseDataTest:PAGES = {
      title: 'Prueba de pagina de curso',
      excerpt: 'Esta es el comentario breve de la pagina'
    }
    if( userLogged.wpToken){
      const response =  await CourseRepositoryInstance.create(courseDataTest, userLogged.wpToken)
      console.log('Pagina',response)
      return response;
    }else{
      alert('Lo sentimos no tienes permisos')
    }
  }

  useEffect(() => {
    let fetching = true;
    return () => {fetching = false}
  }, [userLogged])
  
  
  return (
    <CoursesView createCourses={createCourses}></CoursesView>
  )
}


const CoursesView = ({createCourses}:{createCourses:Function}) => {
  
  return (
    <div>Courses 
      <button onClick={()=>createCourses({})}>CREAR CUrsos</button>
    </div>
  )
}

export default Courses