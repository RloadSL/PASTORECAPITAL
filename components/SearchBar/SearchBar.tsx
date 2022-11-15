import InputApp from 'components/FormApp/components/InputApp'
import style from './search.module.scss'
import searchIcon from '../../assets/img/icons/glass.svg'
import React, { useEffect, useState } from 'react'
import { debounce } from 'lodash'
import { getTagsFromServer } from 'infrastructure/wordpress/wp.utils'
import Card from 'components/Card'

const SearchBar = ({ onFilter, placeholder, enableTags= true }: any) => {
  const [tags, setTags] = useState([])
  


  const getTags = async (tags: string) => {
    const res = await getTagsFromServer(tags)
    if (res.length > 0) {
      setTags(res)
    }
  }

  const _handleFilter = React.useRef(
    debounce(value => {
      setTags([])
      if (value.search?.trim()[0] === '#' && enableTags) {
        getTags(value.search)
      } else {
        onFilter({ ...value, tags: value.tags })
      }
    }, 300)
  ).current

  return (
    <SearchBarView placeholder={placeholder} tags={tags} onFilter={_handleFilter} />
  )
}

const SearchBarView = ({ onFilter, tags, placeholder }: any) => {
  const [search, setsearch] = useState('')
  const _handleOnChange = (newValue: {
    search?: string
    tags?: string
  }) => {
    onFilter(newValue)
  }

  return (
    <div className={style.filtersContainer}>
        <div className={style.flexItems}>
          <div className={style.filterSearchItem}>
            <InputApp
              // helper='page.academy.courses.filterSearch.helper'
              value={search}
              onChange={(name: string, value: any) => {
                _handleOnChange({ [name]: value })
                setsearch(value)
              }}
              labelID={placeholder || 'page.academy.courses.filterSearch.label'}
              icon={searchIcon}
              name='search'
              type='text'
            />
          </div>
          <input hidden type='submit'></input>
        </div>
  
      {(tags.length > 0) && (
        <Card cardStyle={['autocomplete', 'elevationSmall']}>
          <div>
            {tags.map((tag: { id: number; name: string }, index: number) => {
              return (
                <p
                  onClick={() => {
                    _handleOnChange({ tags: tag.id.toString() })
                    setsearch('#' + tag.name)
                  }}
                  className={style.itemTag}
                  key={index}
                >
                  #<small>{tag.name}</small>
                </p>
              )
            })}
          </div>
        </Card>
      )}
    </div>
  )
}

export default SearchBar
