/* eslint-disable react-hooks/exhaustive-deps */
import amasRepository from 'infrastructure/repositories/amas.repository'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  getAmasChatroomState,
  getAmasLoading,
  getLastMessages,
  getMessages,
  getOpenChatroom
} from 'ui/redux/slices/amas/amas.selectors'
import { AppDispatch } from 'ui/redux/store'
import { useDispatch } from 'react-redux'
import {
  setChatrommMessages,
  setChatroom
} from 'ui/redux/slices/amas/amas.slice'
import ChatActions from './components/ChatActions/ChatActions'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import { CHAT_STATE, CHAT_STATE_PUBLIC, MessageDto } from 'infrastructure/dto/amas.dto'
import Messages from './components/Messages/Messages'
import ButtonApp from 'components/ButtonApp'
import { Unsubscribe } from 'firebase/firestore'
import style from './chatroom.module.scss'

const Chatroom = () => {
  const userLoggued = useSelector(getUserLogged)
  const messages = useSelector(getMessages)
  const oppenedChatroom = useSelector(getOpenChatroom)
  const lastMessage = useSelector(getLastMessages)
  const loading = useSelector(getAmasLoading)
  const { query, push, asPath } = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const [chatroomState, setState_chat] = useState<{ state_chat: CHAT_STATE_PUBLIC, state: CHAT_STATE }>({ state_chat: oppenedChatroom?.state_chat || 'public', state: oppenedChatroom?.state || 'active' })
  const canWrite = useRef(
    userLoggued?.uid === oppenedChatroom?.interviewee.uid ||
    userLoggued?.role.level >= 1 ||
    oppenedChatroom.state_chat === 'public'
  ).current

  const profile = useRef<'interviewee' | 'interviewer' | 'guest'>(
    userLoggued?.uid === oppenedChatroom?.interviewee.uid
      ? 'interviewee'
      : userLoggued?.role.level >= 1
        ? 'interviewer'
        : 'guest'
  ).current

  useEffect(() => {
    if (userLoggued?.uid === 'not-logged') {
      push({ pathname: '/login', query: { redirect: asPath } })
    }
  }, [userLoggued?.uid])

  useEffect(() => {
    if (!oppenedChatroom && query.chatroom_id && !loading) {
      amasRepository.getChatroom(query.chatroom_id as string).then(chatroom => {
        dispatch(setChatroom(chatroom))
      })
    }
  }, [query.chatroom_id])
  let unsub = useRef<Unsubscribe | undefined>().current
  let unsubChatroom = useRef<Unsubscribe | undefined>().current

  useEffect(() => {
    //Escuchando mensajes
    if (oppenedChatroom?.id && !lastMessage) {
      if (unsub) {
        unsub()
        unsub = undefined
      }

      unsub = oppenedChatroom.openChatroom((onMessages: any) => {
        if (onMessages.last?.id != lastMessage?.id) {
          dispatch(
            setChatrommMessages({
              messages: [...onMessages.items],
              last: onMessages.last
            })
          )
        }
      })
    }

    //Escuchando Chatroom
    if (oppenedChatroom?.id && !unsubChatroom) {
      unsubChatroom = oppenedChatroom.listenChatrooom((data: any) => {
        const { state, state_chat } = data;
        setState_chat({ state, state_chat })
      })
    }


  }, [oppenedChatroom?.id])

  const chatContainerRef = useRef<any>(null)
   useEffect(() => {
    if(messages) chatContainerRef?.current.scroll(0, 120 * messages?.length)
  }, [lastMessage?.id])

  const sendMessage = async (message: string) => {
    const data: MessageDto = {
      chatroom_id: oppenedChatroom.id,
      message,
      owner: {
        uid: userLoggued?.uid,
        fullname: userLoggued.fullname,
        profile
      }
    }
    await oppenedChatroom.pushMessage(data)
  }

  const deleteMessage = async (message_id: string) => {
    await oppenedChatroom.deleteMessage(message_id)
  }

  const loadMore = async () => {
    oppenedChatroom.getChatroomMessages(lastMessage).then(res => {
      const { items, last } = res
      dispatch(
        setChatrommMessages({
          messages: [...(messages as Array<any>), ...items],
          last: last
        })
      )
    })
  }

  const togglePublicRoom = async () => {
    const state_chat = chatroomState.state_chat === 'public' ? 'private' : 'public'
    await oppenedChatroom.setChatroom({ state_chat: state_chat })
  }

  const closeChatroom = async () => {
    await oppenedChatroom.setChatroom({ state: 'closed' })
  }
  return (
    <div className={style.chatRoom}>
      <div>Entrevistado: {oppenedChatroom?.interviewee.fullname}</div>
      <div>Tema: {oppenedChatroom?.title}</div>
      <div className={style.messagesContainer}>
        <div ref={chatContainerRef} className={style.messagesContainer_messages}>
          <div>
            <ButtonApp buttonStyle={'link'} onClick={loadMore}>
              cargar más
            </ButtonApp>
          </div>
          <Messages messages={messages} onDelete={deleteMessage} />
        </div>

        <div className={style.messagesContainer_actions}>
          <div id='unauthorized_cover'>
            Estado de la sala: {chatroomState.state_chat}
          </div>
          {canWrite && <div id='unauthorized_cover'></div>}
          {chatroomState.state === 'active' ? <ChatActions
            onSendMessage={canWrite ? sendMessage : () => alert('Unauthorized')}
            onCloseChatroom={profile != 'guest' ? closeChatroom : undefined}
            openPublicRoom={profile != 'guest' ? togglePublicRoom : undefined}
          /> : <h3>La sala esta cerrada</h3>}

        </div>
      </div>

    </div>
  )
}

export default Chatroom
