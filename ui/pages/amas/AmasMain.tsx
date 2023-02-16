import style from 'amas.module.scss'
import ButtonApp from 'components/ButtonApp'
import { Chatroom } from 'domain/Chatroom/Chatroom'
import amasRepository from 'infrastructure/repositories/amas.repository'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { setChatroom } from 'ui/redux/slices/amas/amas.slice'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import { AppDispatch } from 'ui/redux/store'
import CreateChatroom from './components/CreateChatroom/CreateChatroom'
function AmasMain () {
  const userLogged = useSelector(getUserLogged)
  const {push} = useRouter()
  const [updateChatroom, setupdateChatroom] = useState(false)
  const [chatrooms, setchatrooms] = useState<any[]>([])
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    let fetch = true
    amasRepository.getChatRooms().then(res => setchatrooms(res as Chatroom[]))
    return () => {
      fetch = false
    }
  }, [userLogged?.uid])

  const openChatroom = (chatroom: Chatroom) => {
    dispatch(setChatroom(chatroom))
    push(`/amas/${chatroom.id}`)
  }

  return (
    <div>
      <div>
        Crear sala solo con administrador
        {userLogged?.role.level > 1 && (
          <ButtonApp onClick={() => setupdateChatroom(true)}>
            {' '}
            Crear nueva sala{' '}
          </ButtonApp>
        )}
        {updateChatroom && (
          <CreateChatroom
            onClose={() => setupdateChatroom(false)}
          ></CreateChatroom>
        )}
      </div>
      <div>
        {chatrooms.map(item => (
          <div key={item.id} onClick={() => openChatroom(item)}>
            <div>{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AmasMain
