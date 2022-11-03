import ButtonApp from 'components/ButtonApp'
import LinkApp from 'components/LinkApp'
import React from 'react'
import style from './categoriesMap.module.scss'
import iconDelete from '../../../../../assets/img/icons/trash.svg'
import iconEdit from '../../../../../assets/img/icons/pencil.svg'
import addIcon from '../../../../../assets/img/icons/add-document.svg'
import { FormattedMessage } from 'react-intl'
import { WP_TERM } from 'infrastructure/dto/wp.dto'
import { useRouter } from 'next/router'
import LoadMoreLoading from 'components/LoadMoreLoading'

interface ARTICLEFILTERSPROPS {
  categories: WP_TERM[]
  navigate?: Function
  editionGranted: any
  onCreate: Function
}

const CategoriesMap = ({
  categories,
  editionGranted,
  onCreate
}: ARTICLEFILTERSPROPS) => {
  const router = useRouter()
  const navigate = (queryparams: any, slug: string) => {
    router.push({
      pathname: router.asPath + slug,
      query: queryparams
    })
  }
  return categories.length > 0 ? (
    <CategoriesMapView
      onCreate={onCreate}
      editionGranted={editionGranted}
      navigate={navigate}
      categories={categories}
    ></CategoriesMapView>
  ) : (
    <LoadMoreLoading></LoadMoreLoading>
  )
}

const CategoriesMapView = ({
  onCreate,
  categories = [],
  navigate,
  editionGranted
}: ARTICLEFILTERSPROPS) => {
  return (
    <div className={style.filtersContainer}>
      <span className={style.filterLabel}>
        <FormattedMessage id='Mis categorías' />
      </span>
      <div className={style.filterListContainer}>
        <ul className={style.filterList}>
          {categories.map((cat, index) => {
            return (
              <li key={index}>
                <ButtonApp
                  onClick={
                    navigate
                      ? () =>
                          navigate(
                            {
                              cat: cat.term_id,
                              category_name: cat.name
                            },
                            cat.slug
                          )
                      : () => null
                  }
                  type='button'
                  buttonStyle='primary'
                  size='small'
                >
                  {cat.name}
                </ButtonApp>
              </li>
            )
          })}
        </ul>
      </div>
      {editionGranted && (
        <div className={`admin-buttons-container ${style.adminButtons}`}>
          <ButtonApp
            labelID={'Añadir categoría'}
            onClick={() => onCreate()}
            type='button'
            buttonStyle='primary'
            size='small'
            icon={addIcon}
          />
          {/* <ButtonApp
          labelID={'Borrar categoría'}
          onClick={() => console.log('borrar')}
          type='button'
          buttonStyle='delete'
          size='small'
          icon={iconDelete}
        /> */}
        </div>
      )}
    </div>
  )
}

export default CategoriesMap
