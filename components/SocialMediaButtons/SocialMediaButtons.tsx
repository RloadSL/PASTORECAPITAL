import style from './socialMediaButtons.module.scss'
import {
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
} from 'next-share'


interface SOCIALMEDIABUTTONSPROPS {
  // title:string
  // quote:string
  // url:string
}

/**
 * Componente de redes sociales a partir del componente https://github.com/Bunlong/next-share
 * @param param0 
 * @returns 
 */

const SocialMediaButtons = ({}: SOCIALMEDIABUTTONSPROPS) => {
  return <SocialMediaButtonsView></SocialMediaButtonsView>
}

const SocialMediaButtonsView = ({ }: SOCIALMEDIABUTTONSPROPS) => {
  return <div className={style.socialMediaButtonsContainer}>
    <ul className='flex-container'>
      <li>
        <TwitterShareButton
          url={'https://github.com/next-share'}
          title={'next-share is a social share buttons for your next React apps.'}
        >
          <TwitterIcon size={32} iconFillColor={'#110151'} bgStyle={{ fill: 'white', outline: '1px solid #110151', borderRadius: '100%' }} round />
        </TwitterShareButton>
      </li>
      <li>
        <FacebookShareButton
          url={'https://github.com/next-share'}
          quote={'next-share is a social share buttons for your next React apps.'}
          hashtag={'#nextshare'}
        >
          <FacebookIcon size={32} iconFillColor={'#110151'} bgStyle={{ fill: 'white', outline: '1px solid #110151', borderRadius: '100%' }} round />
        </FacebookShareButton>
      </li>
      <li></li>
    </ul>
  </div>
}

export default SocialMediaButtons