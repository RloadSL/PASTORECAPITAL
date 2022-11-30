import ButtonApp from 'components/ButtonApp';
import { FormattedMessage } from 'react-intl';
import style from './lockedContent.module.scss';
import { useRouter } from 'next/router'
import Link from 'next/link';

interface LOCKEDCONTENTPROPS {
}

const LockedContent = ({ }: LOCKEDCONTENTPROPS) => {
  const router = useRouter()

  return (
    <div className={style.lockedContentContainer}>
      <p>
        <FormattedMessage id={'page.flashUpdates.lockedContent.text'} />
      </p>
      {/* <ButtonApp
        labelID='Acceder'
        onClick={() => router.route = '/login'} 
        buttonStyle='dark'
      /> */}
      <Link href={'/login'}>
        <a className={style.loginLink}>
          <FormattedMessage id='component.navbar.signUpBtn' />
        </a>
      </Link>
    </div>
  )
}

export default LockedContent;