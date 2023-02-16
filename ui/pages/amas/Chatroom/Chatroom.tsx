import amasRepository from 'infrastructure/repositories/amas.repository'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getAmasLoading, getOpenChatroom } from 'ui/redux/slices/amas/amas.selectors'
import { AppDispatch } from 'ui/redux/store'
import { useDispatch } from 'react-redux'
import { setChatroom } from 'ui/redux/slices/amas/amas.slice'

function Chatroom() {
  const oppenedChatroom = useSelector(getOpenChatroom)
  const loading = useSelector(getAmasLoading)
  const {query} =useRouter()
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if(!oppenedChatroom && query.chatroom_id && !loading){
      amasRepository.getChatroom(query.chatroom_id as string).then(chatroom => {
        dispatch(setChatroom(chatroom))
      })
    }
  }, [query.chatroom_id])
  
  useEffect(() => {
    if(oppenedChatroom?.id){
      console.log(oppenedChatroom.title)
    }
  }, [oppenedChatroom?.id])
  
  return (
    <div>
      <div>
        {oppenedChatroom?.title}
      </div>
    </div>
  )
}

export default Chatroom