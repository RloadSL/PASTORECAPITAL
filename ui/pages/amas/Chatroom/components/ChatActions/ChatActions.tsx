import React from 'react'
import ButtonApp from 'components/ButtonApp'
import InputFormikApp from 'components/FormApp/components/InputFormikApp'
import { Form, Formik } from 'formik'
import sendIcon from '../../../../../../assets/img/icons/plane.svg'
import Image from 'next/image'
import bubbleIcon from '../../../../../../assets/img/icons/bubble.svg'
import bubbleBannedIcon from '../../../../../../assets/img/icons/bubble-banned.svg'
import lockIcon from '../../../../../../assets/img/icons/lock-v2.svg'
import style from './chat-actions.module.scss'


export interface CHAT_ACTIONS {
  children?: any,
  onSendMessage: Function,
  openPublicRoom?: Function,
  onCloseChatroom?: Function,
  chatState: string
}

const ChatActions = ({
  children,
  onSendMessage,
  openPublicRoom,
  onCloseChatroom,
  chatState
}: CHAT_ACTIONS) => {
  return (
    <div className={style.chatActions}>
      <div className={style.chatTools}>
        {openPublicRoom && (
          <ButtonApp onClick={openPublicRoom} buttonStyle='link'>
            <div className={style.button_action}>
              <span className={style.button_action_label}>{chatState !== 'public' ? 'Abrir comentarios' : 'Cerrar comentarios'}</span>
              <span className={style.button_action_icon}>
                {chatState !== 'public' ? <Image src={bubbleIcon} alt='' /> : <Image src={bubbleBannedIcon} alt='' />}
              </span>
            </div>
          </ButtonApp>
        )
        }
        {onCloseChatroom && (
          <ButtonApp onClick={onCloseChatroom} buttonStyle='link'>
            <div className={style.button_action}>
              <span className={style.button_action_label}>Terminar entrevista</span>
              <span className={style.button_action_icon}>
                <Image src={lockIcon} alt='' />
              </span>
            </div>
          </ButtonApp>
        )}
      </div>
      <div className={style.chatForm}>
        <Formik
          initialValues={{ message: '' }}
          onSubmit={({ message }, { resetForm }) => {
            resetForm()
            onSendMessage(message)
          }}
        >
          {() => (
            <Form>
              <div className={style.textInput}>
                <InputFormikApp
                  type='text'
                  name='message'
                  labelID={'forms.labels.amas.message'}
                />
              </div>
              <div className={style.sendButton}>
                <ButtonApp type='submit' icon={sendIcon}>
                  <span className='only-readers'>Enviar comentario</span>
                </ButtonApp>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default ChatActions
