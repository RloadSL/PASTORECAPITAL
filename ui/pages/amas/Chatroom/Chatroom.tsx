/* eslint-disable react-hooks/exhaustive-deps */
import amasRepository from 'infrastructure/repositories/amas.repository'
import { useRouter } from 'next/router'
import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import {
  getAmasLoading,
  getLastMessages,
  getMessages,
  getOpenChatroom
} from 'ui/redux/slices/amas/amas.selectors'
import { AppDispatch } from 'ui/redux/store'
import { useDispatch } from 'react-redux'
import {
  cleanMessages,
  setChatrommMessages,
  setChatroom
} from 'ui/redux/slices/amas/amas.slice'
import ChatActions from './components/ChatActions/ChatActions'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import { MessageDto } from 'infrastructure/dto/amas.dto'
import Messages from './components/Messages/Messages'
import InfiniteScroll from 'react-infinite-scroll-component'
import LoadMoreLoading from 'components/LoadMoreLoading'
import ButtonApp from 'components/ButtonApp'

function Chatroom () {
  const userLoggued = useSelector(getUserLogged)
  const messages = useSelector(getMessages)
  const oppenedChatroom = useSelector(getOpenChatroom)
  const lastMessage = useSelector(getLastMessages)
  const loading = useSelector(getAmasLoading)
  const { query, push, asPath } = useRouter()
  const dispatch = useDispatch<AppDispatch>()

  const canWrite = useRef(
    userLoggued?.uid === oppenedChatroom?.interviewee.uid ||
      userLoggued?.role.level >= 1
  ).current
  useEffect(() => {
    if (userLoggued?.uid === 'not-logged') {
      push({ pathname: '/login', query: { redirect: asPath } })
    }
  }, [userLoggued?.uid])
  console.log(messages)
  useEffect(() => {
    if (!oppenedChatroom && query.chatroom_id && !loading) {
      amasRepository.getChatroom(query.chatroom_id as string).then(chatroom => {
        dispatch(setChatroom(chatroom))
      })
    }
  }, [query.chatroom_id])

  useEffect(() => {
    if (oppenedChatroom?.id && !lastMessage) {
      oppenedChatroom.openChatroom((onMessages: any) => {
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
  }, [oppenedChatroom?.id])

  /*  useEffect(() => {
    window.scroll(0, document.body.offsetHeight)
  }, [lastMessage?.id]) */

  const sendMessage = async (message: string) => {
    const data: MessageDto = {
      chatroom_id: oppenedChatroom.id,
      message,
      owner: {
        uid: userLoggued?.uid,
        fullname: userLoggued.fullname
      }
    }
    await oppenedChatroom.pushMessage(data)
  }

  const deleteMessage = async (message_id: string) => {
    await oppenedChatroom.deleteMessage(message_id)
  }

  const loadMore = () => {
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

  return (
    <div>
      <div>Entrevistado: {oppenedChatroom?.interviewee.fullname}</div>
      <div>Tema: {oppenedChatroom?.title}</div>
      <div>
        <div>
          <ButtonApp buttonStyle={'link'} onClick={loadMore}>
            cargar más
          </ButtonApp>
        </div>
        <Messages messages={messages} onDelete={deleteMessage} />
      </div>
      <div>
        {canWrite && <div id='unauthorized_cover'></div>}
        <ChatActions
          onSendMessage={canWrite ? sendMessage : () => alert('Unauthorized')}
          onCloseChatroom={() => {}}
          openPublicRoom={() => {}}
        />
      </div>
    </div>
  )
}

export default Chatroom
