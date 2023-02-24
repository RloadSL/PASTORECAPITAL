import React from 'react'
import ButtonApp from 'components/ButtonApp'
import InputFormikApp from 'components/FormApp/components/InputFormikApp'
import { Form, Formik } from 'formik'
import sendIcon from '../../../../../../assets/img/icons/plane.svg'
import style from './chat-actions.module.scss'

export interface CHAT_ACTIONS {
  children?: any,
  onSendMessage: Function,
  openPublicRoom?: Function,
  onCloseChatroom?: Function
}

const ChatActions = ({
  children,
  onSendMessage,
  openPublicRoom,
  onCloseChatroom
}: CHAT_ACTIONS) => {
  return (
    <div className={style.chatActions}>
      <div>
        {openPublicRoom && <ButtonApp onClick={openPublicRoom} buttonStyle='link'>
          Abrir al publico
        </ButtonApp>}
        {onCloseChatroom && <ButtonApp onClick={onCloseChatroom} buttonStyle='link'>
          Terminar entrevista
        </ButtonApp>}
      </div>
      <div>
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
