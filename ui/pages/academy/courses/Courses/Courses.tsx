import SelectApp from "components/FormApp/components/SelectApp/SelectApp"
import PostGrid from "components/PostGrid"
import { Course } from "domain/Course/Course"
import { CourseRepositoryInstance } from "infrastructure/repositories/courses.repository"
import { useEffect, useState } from "react"
import { options } from "ui/utils/test.data"
import CreateForm from "./components/CreateForm"
import style from './Courses.module.scss'




/**
 * Función principal del componente Courses
 * @returns
 */

const Courses = () => {

  const [courses, setCourses]:[courses: Course[], setCourses: Function] = useState([])
  useEffect(() => {
    let fetching = true;
    getCourses().then((c)=>{
      if(fetching){
        setCourses(c)
      }
    })
    return () => {fetching = false};
  }, [])


  const getCourses = async ()=>{
    const res = await CourseRepositoryInstance.readFromWp()
    return res;
  }

  return <CourseView courses={courses}></CourseView>
}

const CourseView = ({courses}:{courses: any}) => {

  return (
    <div className={style.coursesPage}>
      <div><form>
        <SelectApp labelID={'categoría'} selectOptions={options} />
      </form></div>
      <div className="title-container">
        <p className="small-caps">Academia</p>
        <h1>Cursos</h1>
        <CreateForm></CreateForm>
      </div>
      <PostGrid gridItems={courses} />
    </div>
  )
}

export default Courses