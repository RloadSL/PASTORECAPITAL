import { CourseRepositoryInstance } from 'infrastructure/repositories/courses.repository'
import React from 'react'
import { useSelector } from 'react-redux'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'

const courseDataTest:any = {
  title: 'Prueba de pagina de curso',
  excerpt: 'Esta es el comentario breve de la pagina'
}

const CreateForm = () => {
  const userLogged = useSelector(getUserLogged)

  const createCourses = async (data:any):Promise<any> => {
    
    if( userLogged.wpToken){
      const response =  await CourseRepositoryInstance.create(data, userLogged.wpToken)
      return response;
    }else{
      alert('Lo sentimos no tienes permisos')
    }
  }


  return (
    <CreateFormView createCourses={(data:any)=>createCourses(data)}></CreateFormView>
  )
}

const CreateFormView = ({createCourses}:{createCourses:Function})=>{
  return (
    <div>
      <button onClick={()=>createCourses(courseDataTest)}>Crear Nuevo Page</button>
    </div>
  )
}

export default CreateForm;