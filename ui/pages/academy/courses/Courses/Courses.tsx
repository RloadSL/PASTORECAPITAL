/* eslint-disable react-hooks/exhaustive-deps */
import SelectApp from "components/FormApp/components/SelectApp/SelectApp"
import PostGrid from "components/PostGrid"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { academyGetCurses } from "ui/redux/slices/academy/academy.slice"
import { AppDispatch } from "ui/redux/store"
import { options } from "ui/utils/test.data"
import CreateForm from "./components/CreateForm"
import style from './Courses.module.scss'




/**
 * Función principal del componente Courses
 * @returns
 */

const Courses = () => {
  const dispatch = useDispatch<AppDispatch>()
  
  const getCourses = () =>{
      dispatch(academyGetCurses({}))
   }
  
  /* useEffect(() => {
    let fetching = true;
    getCourses();
    return () => {fetching = false};
  }, []) */

  useEffect(() => {
    const onChange:any = (entries:any)=>{
       if(entries[0].isIntersecting){
        console.log('observer')
        getCourses();
       }
    }
    const observer = new IntersectionObserver(onChange, {
      rootMargin: '100px'
    });

    observer.observe(document.getElementById('loadMore') as Element)
  }, [])

  return <CourseView/>
}

const CourseView = () => {
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
      <PostGrid/>
      {/* <ButtonApp type='button' labelID="LoadMore" onClick={()=>loadMore()}/> */}
      <button id="loadMore" type='button'>LoadMore</button>
    </div>
  )
}

export default Courses