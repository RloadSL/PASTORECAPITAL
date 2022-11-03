import ButtonApp from 'components/ButtonApp';
import { FormattedMessage } from 'react-intl';
import style from './lockedContent.module.scss'

interface LOCKEDCONTENTPROPS {
}

const LockedContent = ({ }: LOCKEDCONTENTPROPS) => {
  return (
    <div className={style.lockedContentContainer}>
      <p>
        <FormattedMessage id='Inicia sesión para ver el contenido completo' />
      </p>
      <ButtonApp
        labelID='Acceder'
        onClick={() => console.log('hola')}
        buttonStyle='dark'
      />
    </div>
  )
}

export default LockedContent;