import FormApp from 'components/FormApp'
import InputApp from 'components/FormApp/components/InputApp'
import SelectApp from 'components/FormApp/components/SelectApp/SelectApp'
import style from './FilterCourse.module.scss'
import searchIcon from '../../../../../../../assets/img/icons/glass.svg'
import React, { useEffect, useState } from 'react'
import { CourseRepositoryInstance } from 'infrastructure/repositories/courses.repository'
import { debounce } from 'lodash'
import { getTagsFromServer } from 'infrastructure/wordpress/wp.utils'
import Card from 'components/Card'

const FilterCourse = ({ onFilter }: any) => {
  const [levels, setlevels] = useState([])
  const [tags, setTags] = useState([])
  useEffect(() => {
    let fetching = true
    getLevels()
      .then(res => {
        const options = [{value: '', label: 'Todos', id: null}, ...res]
        if (fetching) setlevels(options as any)
      })
      .catch(() => {
        console.error('Error interno refrescar la página. Para obtener los niveles')
      })
    return () => {
      fetching = false
    }
  }, [])
  
  const getLevels = async () => {
    const response = await CourseRepositoryInstance.readLevelsCategoriesFromWp()
    return response
  }

  const getTags = async (tags: string) => {
    const res = await getTagsFromServer(tags)
    if (res.length > 0) {
      setTags(res)
    }
  }

  const _handleFilter = React.useRef(
    debounce(value => {
      setTags([])
      if (value.search?.trim()[0] === '#') {
        getTags(value.search)
      } else {
        console.log(value)
        onFilter({...value, tags: value.tags})
      }
    }, 300)
  ).current

  return (
    <FilterCourseView tags={tags} levels={levels} onFilter={_handleFilter} />
  )
}

const FilterCourseView = ({ levels, onFilter, tags }: any) => {
  const [tag, settag] = useState('')
  const _handleOnChange = (newValue: {
    search?: string
    categories?: string
    tags?: string
  }) => {
    onFilter(newValue)
  }

  return (
    <div className={style.filtersContainer}>
      <FormApp>
        <div className={style.flexItems}>
          <div className={style.filterSearchItem}>
            <InputApp
            // helper='page.academy.courses.filterSearch.helper'
              value={tag}
              onChange={(name: string, value: any) =>
                _handleOnChange({ [name]: value })
              }
              labelID={'page.academy.courses.filterSearch.label'}
              icon={searchIcon}
              name='search'
              type='text'
            />
          </div>
          <div className={style.flexItemsSelect}>
            <div className={style.filterLevelItem}>
              <SelectApp
                onChange={(name: string, value: any) =>
                  _handleOnChange({ [name]: value.id })
                }
                selectOptions={levels}
                labelID={'page.academy.courses.filterLevel.label'}
                name={'categories'}
              />
            </div>
          </div>
          <input hidden type='submit'></input>
        </div>
      </FormApp>
      {tags.length > 0 && <Card cardStyle={['autocomplete', 'elevationSmall']}>
        <div>
          {tags.map((tag: { id: number; name: string }, index: number) => {
            return (
              <p
                onClick={() => {
                  _handleOnChange({ tags: tag.id.toString() })
                  settag('#'+tag.name)
                }}
                className={style.itemTag}
                key={index}
              >
                #<small>{tag.name}</small>
              </p>
            )
          })}
        </div>
      </Card>}
    </div>
  )
}

export default FilterCourse
