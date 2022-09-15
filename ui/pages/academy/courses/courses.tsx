
import { CourseRepositoryInstance } from 'infrastructure/repositories/courses.repository'
import React, { useEffect } from 'react'
const Courses = () => {
  const getCourses = async ()=>{

  }

  const createCourses = async ():Promise<any> => {
   const response =  await CourseRepositoryInstance.create('NUeva prueba desde Next')
   return response;
  }

  useEffect(() => {
    let fetching = true;
  
    return () => {fetching = false}
  }, [])
  
  
  return (
    <CoursesView createCourses={createCourses}></CoursesView>
  )
}


const CoursesView = ({createCourses}:{createCourses:Function}) => {
  return (
    <div>Courses 
      <button onClick={()=>createCourses()}>CREAR CUrsos</button>
    </div>
  )
}

export default Courses