/* eslint-disable react-hooks/exhaustive-deps */
import ButtonApp from 'components/ButtonApp'
import ItemList from 'components/ItemList'
import { User } from 'domain/User/User'
import { MessageDto } from 'infrastructure/dto/amas.dto'
import React, { useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { getMessages } from 'ui/redux/slices/amas/amas.selectors'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'

interface MESSAGES {
  onDelete: Function
  reverse?: boolean
  messages?: MessageDto[]
  
}

const ItemMemo = React.memo(function Memorized ({
  item,
  userLogged,
  onDelete
}: {
  item: MessageDto
  userLogged: User
  onDelete: Function
}) {
  return (
    <div>
      {(userLogged?.role.level >= 1 || userLogged?.uid === item.owner.uid) && (
        <div>
          <p>Publisher Profile @Maria: {item.owner.profile || 'Borrar este comentario'}</p>
          <ButtonApp onClick={() => onDelete(item.id)}>X</ButtonApp>
        </div>
      )}
      <div>{item.owner.fullname}</div>
      <div>{item.message}</div>
    </div>
  )
})

const Messages = ({ onDelete, messages }: MESSAGES) => {
  const userLogged = useSelector(getUserLogged)

  return (
    <>
      {messages && (
        <div>
          <ItemList
            items={messages
              .map(item => {
                return <ItemMemo key={item.id} item={item} onDelete={onDelete} userLogged={userLogged} />
              })
              .reverse()}
          />
        </div>
      )}
    </>
  )
}

export default Messages
