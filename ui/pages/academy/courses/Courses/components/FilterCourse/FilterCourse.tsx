import FormApp from 'components/FormApp'
import InputApp from 'components/FormApp/components/InputApp'
import SelectApp from 'components/FormApp/components/SelectApp/SelectApp'
import style from './FilterCourse.module.scss'
import searchIcon from '../../../../../../../assets/img/icons/glass.svg'
import { useEffect, useState } from 'react'
import { CourseRepositoryInstance } from 'infrastructure/repositories/courses.repository'

interface FILTERCOURSEPROPS {
}

const FilterCourse = ({ }: FILTERCOURSEPROPS) => {
  const [levels, setlevels] = useState([])
  useEffect(() => {
    let fetching = true
    getLevels()
      .then(res => {
        if (fetching) setlevels(res as any)
      })
      .catch(() => {
        alert('Error interno refrescar la página.')
      })
    return () => {
      fetching = false
    }
  }, [])
  const getLevels = async () => {
    const response = await CourseRepositoryInstance.readLevelsCategoriesFromWp()
    return response
  }
  return (
    <FilterCourseView levels={levels} />
  )
}

const FilterCourseView = ({levels}:any) => {
  return (
    <div className={style.filtersContainer}>
      <FormApp onSubmit={() => console.log('')} validationSchema={''} initialValues={{}}>
        <div className={style.flexItems}>
          <div className={style.filterSearchItem}>
            <InputApp labelID={'page.academy.courses.filterSearch.label'} icon={searchIcon} error={''} name={''} type='text' />
          </div>
          <div className={style.flexItemsSelect}>
            <div className={style.filterLevelItem}>
              <SelectApp selectOptions={levels} labelID={'page.academy.courses.filterLevel.label'} error={''} name={''} />
            </div>
            <div className={style.filterTagsItem}>
              <SelectApp selectOptions={[]} labelID={'page.academy.courses.filterTags.label'} error={''} name={''} />
            </div>
          </div>
        </div>
      </FormApp>
    </div>
  )
}

export default FilterCourse;
