import ButtonApp from 'components/ButtonApp'
import InputFormikApp from 'components/FormApp/components/InputFormikApp'
import { Form, Formik } from 'formik'
import React from 'react'

export interface CHAT_ACTIONS{
  children? : any,
  onSendMessage: Function,
  openPublicRoom: Function,
  onCloseChatroom: Function
}

function ChatActions ({
  children,
  onSendMessage,
  openPublicRoom,
  onCloseChatroom
}: CHAT_ACTIONS) {
  return (
    <div>
      <div>
        <ButtonApp onClick={openPublicRoom} buttonStyle='link'>
          Abrir al publico
        </ButtonApp>
        <ButtonApp onClick={onCloseChatroom} buttonStyle='link'>
          Terminar entrevista
        </ButtonApp>
      </div>
      <div>
        <Formik
          initialValues={{ message: '' }}
          onSubmit={({message}, { resetForm }) => {
            resetForm()
            onSendMessage(message)
          }}
        >
          {() => (
            <Form>
              <InputFormikApp
                type='text'
                name='message'
                labelID={'forms.labels.amas.message'}
              />
              <ButtonApp type='submit'> Send </ButtonApp>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default ChatActions
