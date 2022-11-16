import style from './socialMediaButtons.module.scss'
import {
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
} from 'next-share'


interface SOCIALMEDIABUTTONSPROPS {
  title:string
  description:string
  url:any
}

/**
 * Componente de redes sociales a partir del componente https://github.com/Bunlong/next-share
 * @param param0 
 * @returns 
 */

const SocialMediaButtons = ({title,description,url}: SOCIALMEDIABUTTONSPROPS) => {
  return <SocialMediaButtonsView title={title} url={url} description={description}/>
}

const SocialMediaButtonsView = ({title,description,url}: SOCIALMEDIABUTTONSPROPS) => {
  return <div className={style.socialMediaButtonsContainer}>
    <ul className='flex-container justify-end'>
      <li>
        <TwitterShareButton url={url} title={title}>
          <TwitterIcon size={32} iconFillColor={'#110151'} bgStyle={{ fill: 'white', outline: '1px solid #110151', borderRadius: '100%' }} round />
        </TwitterShareButton>
      </li>
      <li>
        <FacebookShareButton
          url={url}
          quote={description}
          // hashtag={'#nextshare'}
        >
          <FacebookIcon size={32} iconFillColor={'#110151'} bgStyle={{ fill: 'white', outline: '1px solid #110151', borderRadius: '100%' }} round />
        </FacebookShareButton>
      </li>
      <li></li>
    </ul>
  </div>
}

export default SocialMediaButtons