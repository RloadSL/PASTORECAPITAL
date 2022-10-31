import ButtonApp from 'components/ButtonApp'
import LinkApp from 'components/LinkApp'
import React from 'react'
import style from './ArticleFilters.module.scss'
import iconDelete from '../../../../../assets/img/icons/trash.svg'
import iconEdit from '../../../../../assets/img/icons/pencil.svg'
import addIcon from '../../../../../assets/img/icons/add-document.svg'
import { FormattedMessage } from 'react-intl'

interface ARTICLEFILTERSPROPS {
}

const tags = ['Filter 1', 'Filter 2', 'Filter 3', 'Filter 4', 'Filter 5']

const ArticleFilters = ({ }: ARTICLEFILTERSPROPS) => {
  return <ArticleFiltersView></ArticleFiltersView>
}

const ArticleFiltersView = ({ }: ARTICLEFILTERSPROPS) => {
  return (
    <div className={style.filtersContainer}>
      <span className={style.filterLabel}><FormattedMessage id='Filtrar por' /></span>
      <div className={style.filterListContainer}>
        <ul className={style.filterList}>
          {tags.map((tag, index) => {
            return (
              <li key={index}>
                <ButtonApp
                  labelID={tag}
                  onClick={() => console.log('crear')}
                  type='button'
                  buttonStyle='primary'
                  size='small'
                />
              </li>
            )
          })}
        </ul>
      </div>
      <div className={`admin-buttons-container ${style.adminButtons}`}>
        <ButtonApp
          labelID={'Añadir categoría'}
          onClick={() => console.log('crear')}
          type='button'
          buttonStyle='primary'
          size='small'
          icon={addIcon}
        />
        <ButtonApp
          labelID={'Borrar categoría'}
          onClick={() => console.log('borrar')}
          type='button'
          buttonStyle='delete'
          size='small'
          icon={iconDelete}
        />
      </div>
    </div>

  )
}

export default ArticleFilters