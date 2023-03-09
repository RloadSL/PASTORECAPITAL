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
import AlertApp from 'components/AlertApp'
import { FormattedMessage } from 'react-intl'
import Image from 'next/image'
import lockedIcon from '../../../../assets/img/icons/lock.svg'

const Chatroom = () => {
  const userLoggued = useSelector(getUserLogged)
  const messages = useSelector(getMessages)
  const oppenedChatroom = useSelector(getOpenChatroom)
  const lastMessage = useSelector(getLastMessages)
  const loading = useSelector(getAmasLoading)
  const { query, push, asPath } = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const [visibleCommentsMessage, setVisibleCommentsMessage] =
    useState(false)
  const [visibleRoomMessage, setVisibleRoomMessage] =
    useState(false)
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
    if (messages){
      chatContainerRef?.current.scroll(0, 120 * messages?.length)
    } 
  }, [messages?.length])

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
    setVisibleCommentsMessage(false)
  }

  const closeChatroom = async () => {
    await oppenedChatroom.setChatroom({ state: 'closed' })
    setVisibleRoomMessage(false)
  }
  return (
    <div className={style.chatRoom}>
      <header>
        <span className='small-caps'><FormattedMessage id='amas' /></span>
        <h1 className='main-title'>{oppenedChatroom?.title}</h1>
        <div className={style.subtitle}>
          <span className={style.subtitle_intervieweeLabel}>
            <FormattedMessage id='page.amas.interviewLabel' />:
            <strong>{oppenedChatroom?.interviewee.fullname}</strong>
          </span>
        </div>
      </header>
      <div className={style.messagesContainer}>
        <div ref={chatContainerRef} className={style.messagesContainer_messages}>
          {(messages && messages?.length >= 100) && <div className={style.loadMore_container}>
            <ButtonApp buttonStyle={'link'} onClick={loadMore}>
              <FormattedMessage id={'btn.loadMore'}/>
            </ButtonApp>
          </div>}
          <Messages messages={messages} onDelete={deleteMessage} />
        </div>

        <div className={style.messagesContainer_actions}>
          {/* <div id='unauthorized_cover'>
            Estado de la sala: {chatroomState.state_chat}
          </div> */}
          {!canWrite && <div id='unauthorized_cover' className={style.blockedCover}></div>}
          {chatroomState.state === 'active' ? (
            <ChatActions
              chatState={chatroomState.state_chat}
              onSendMessage={canWrite ? sendMessage : () => alert('Unauthorized')}
              onCloseChatroom={profile === 'interviewer' ? () => setVisibleRoomMessage(true) : undefined}
              openPublicRoom={profile === 'interviewer' ? () => setVisibleCommentsMessage(true) : undefined}
            />) : (
            <div className={style.closedRoomMessage}>
              <div className={style.closedRoomMessage_icon}>
                <Image src={lockedIcon} alt={''} />
              </div>
              <div className={style.closedRoomMessage_text}>
                <FormattedMessage id='page.amas.closedRoom.text' />
              </div>
            </div>
          )}
        </div>
      </div>
      {visibleCommentsMessage && (
        <AlertApp
          title={chatroomState.state_chat === 'private' ? 'page.amas.modalCommentsOpen.title' : 'page.amas.modalCommentsClose.title'}
          onAction={profile != 'guest' ? togglePublicRoom : undefined}
          visible
          onCancel={() => setVisibleCommentsMessage(false)}
        >
          <div className={style.modalContainer}>
            {chatroomState.state_chat === 'private' ? (
              <FormattedMessage
                id='page.amas.modalCommentsOpen.text'
                values={{ br: <br /> }}
              />
            ) : (
              <FormattedMessage
                id='page.amas.modalCommentsClose.text'
                values={{ br: <br /> }}
              />
            )}
          </div>
        </AlertApp>
      )}
      {visibleRoomMessage && (
        <AlertApp
          title={'page.amas.modalRoomClose.title'}
          onAction={profile != 'guest' ? closeChatroom : undefined}
          visible
          onCancel={() => setVisibleRoomMessage(false)}
        >
          <div className={style.modalContainer}>
            <FormattedMessage
              id='page.amas.modalRoomClose.text'
              values={{ br: <br /> }}
            />
          </div>
        </AlertApp>
      )}
    </div>
  )
}

export default Chatroom
