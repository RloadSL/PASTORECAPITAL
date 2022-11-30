import style from './socialMediaButtons.module.scss'
import {
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
} from 'next-share'
import { HOST } from 'infrastructure/contants'


interface SOCIALMEDIABUTTONSPROPS {
  title: string
  description: string
  url: any
}

/**
 * Componente de redes sociales a partir del componente https://github.com/Bunlong/next-share
 * @param param0 
 * @returns 
 */

const SocialMediaButtons = ({ title, description, url }: SOCIALMEDIABUTTONSPROPS) => {
  return <SocialMediaButtonsView title={title} url={url} description={description} />
}

const SocialMediaButtonsView = ({ title, description, url }: SOCIALMEDIABUTTONSPROPS) => {
  return <div className={style.socialMediaButtonsContainer}>
    <ul className='flex-container justify-end'>
      <li className={style.socialButton}>
        <TwitterShareButton url={`${HOST}${url}`} title={title}>
          <TwitterIcon size={32} iconFillColor={'#110151'} bgStyle={{
            fill: 'transparent'
          }} />
        </TwitterShareButton>
      </li>
      <li className={style.socialButton}>
        <FacebookShareButton
          url={`${HOST}${url}`}
          quote={description}
          hashtag={'#pastorecapital'}
        >
          <FacebookIcon size={32} iconFillColor={'#110151'} bgStyle={{fill: 'transparent'}} />
        </FacebookShareButton>
      </li>
      <li></li>
    </ul>
  </div>
}

export default SocialMediaButtons