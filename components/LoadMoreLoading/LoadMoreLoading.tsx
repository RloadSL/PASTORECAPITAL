import style from './LoadMoreLoading.module.scss'
import Image from 'next/image'
import loadMoreImg from '../../assets/img/lazy.gif'

const LoadMore = () => {
  return (
    <div className={style.loadMoreContainer}>
      <div className={style.loadMore}>
        <Image src={loadMoreImg} alt=''/>
      </div>
    </div>
  )
}

export default LoadMore;