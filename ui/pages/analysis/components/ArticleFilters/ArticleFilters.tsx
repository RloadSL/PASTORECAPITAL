import ButtonApp from 'components/ButtonApp'
import LinkApp from 'components/LinkApp'
import React from 'react'
import style from './ArticleFilters.module.scss'
import iconDelete from '../../../../../assets/img/icons/trash.svg'
import iconEdit from '../../../../../assets/img/icons/pencil.svg'
import addIcon from '../../../../../assets/img/icons/add-document.svg'

interface ARTICLEFILTERSPROPS {
}

const ArticleFilters = ({ }: ARTICLEFILTERSPROPS) => {
  return <ArticleFiltersView></ArticleFiltersView>
}

const ArticleFiltersView = ({ }: ARTICLEFILTERSPROPS) => {
  return (
    <div>
      filter tags
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