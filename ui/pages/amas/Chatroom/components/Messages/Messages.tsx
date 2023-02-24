/* eslint-disable react-hooks/exhaustive-deps */
import ButtonApp from 'components/ButtonApp'
import ItemList from 'components/ItemList'
import Image from 'next/image'
import { User } from 'domain/User/User'
import { MessageDto } from 'infrastructure/dto/amas.dto'
import React, { useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { getMessages } from 'ui/redux/slices/amas/amas.selectors'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import style from './messages.module.scss'
import logoPastore from '../../../../../../assets/img/avatar-pastore.svg'
import avatarInterview from '../../../../../../assets/img/avatar-interview.svg'
import trashIcon from '../../../../../../assets/img/icons/trash.svg'
import Avatar from 'components/Avatar'

interface MESSAGES {
  onDelete: Function
  reverse?: boolean
  messages?: MessageDto[]

}

const ItemMemo = React.memo(function Memorized({
  item,
  userLogged,
  onDelete
}: {
  item: MessageDto
  userLogged: User
  onDelete: Function
}) {

  const renderAvatar = (uid:string) => {
    if (item.owner.profile === 'interviewer') {
      return <Image src={logoPastore} alt='Logo pastore capital' />
    } else if (item.owner.profile === 'interviewee') {
      return <Image src={avatarInterview} alt='' />
    }
    return <div className={style.avatarDefault}><Avatar uid={uid} renderItem={item.owner.fullname[0]} /></div>
  }
  
  return (
    <div className={`${style.messagesBoard_message} ${style[item.owner.profile] || style.guest}`}>
      <header className={style.messagesBoard_message_top}>
        <div className={style.avatarBlock}>
          <div className={style.avatarBlock_image}>
            <div className={style.image}>
              {renderAvatar(item.owner.uid)}
            </div>
          </div>
          <span className={style.avatarBlock_text}>{item.owner.fullname}</span>
        </div>
        {(userLogged?.role.level >= 1 || userLogged?.uid === item.owner.uid) && (
          <div className={style.buttonRemove}>
            <ButtonApp size={'small'} icon={trashIcon} onClick={() => onDelete(item.id)}>
              <span className='only-readers'>Borrar comentario</span>
            </ButtonApp>
          </div>
        )}
      </header>
      <div className={style.messagesBoard_message_bottom}>{item.message}</div>
    </div>
  )
})

const Messages = ({ onDelete, messages }: MESSAGES) => {
  const userLogged = useSelector(getUserLogged)

  return (
    <div className={style.messagesBoard}>
      {/*Itemlist no sirve para pintar este tipo de lista de elementos, es para listados planos, noticias, notificaciones, listas simples... tipo tabla de datos, este listado es demasiado particular y tiene una maquetación muy especial para renderizarse con itemlist*/}
      {messages && (
        messages.map(item => {
          return <ItemMemo key={item.id} item={item} onDelete={onDelete} userLogged={userLogged} />
        })
          .reverse()
      )}
    </div>
  )
}

export default Messages
