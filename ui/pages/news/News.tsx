import ButtonApp from 'components/ButtonApp'
import ItemList from 'components/ItemList'
import SearchBar from 'components/SearchBar'
import { useRef, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { news,newsCategories } from 'ui/utils/test.data'
import NewsListItem from './components/newsListItem'
import style from './news.module.scss'
import starIcon from '../../../assets/img/icons/star.svg'

interface NewsProps {
}

/**
 * Componente News y NewsFilter
 * @returns 
 */

const NewsFilters = ({newsCats,onClickFilter}:any) => {
  const [isActive, setIsActive] = useState<string>('');

  return (
    <div className={style.news_filter}>
      <div>
        <ul className={style.newsCategories}>
        {newsCats.map((cat:any) => {
          return (
            <li key={cat.id} className={style.newsCategories_cat}>
              <ButtonApp
                onClick={()=>{
                  onClickFilter();
                  setIsActive(cat.id)
                }}
                type='button'
                buttonStyle={isActive === cat.id ? 'dark' : 'default'}
                size='small'
                icon={cat.slug === 'mis-favoritas' ? starIcon : ''}
              >
                {cat.title}
              </ButtonApp>
            </li>
          )
        })}
        </ul>
       
      </div>
      <SearchBar
        placeholder={'Buscar por palabra clave'}
        // onFilter={(value: { search?: string; tags?: string }) =>
        //   onFilter(value)
        // }
        onFilter={console.log('')}
      />      
    </div>
  )
}

const News = ({ }: NewsProps) => {
  const [isActive, setIsActive] = useState(false);

  const onClickFilter = () => {
    console.log('click en filtro');
    setIsActive(!isActive);
  }

  return (
    <div className={style.news}>
      <header>
        <h1 className='main-title'>
          <FormattedMessage id={'Noticias'} />
        </h1>
        <NewsFilters newsCats={newsCategories} onClickFilter={onClickFilter}/>
      </header>
      <div className={style.news_container}>
        <ItemList
          items={news.map((newItem) => (
            <NewsListItem key={newItem.id} item={newItem} />
          ))}
        />
      </div>
    </div>
  )
}

export default News;