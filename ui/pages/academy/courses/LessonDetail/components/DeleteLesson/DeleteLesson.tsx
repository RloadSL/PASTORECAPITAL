import ButtonApp from 'components/ButtonApp'
import Loading from 'components/Loading'
import Modal from 'components/Modal'
import { InfoApp } from 'domain/InfoApp/InfoApp'
import { LessonRepositoryInstance } from 'infrastructure/repositories/lessons.repository'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { useSystem } from 'ui/hooks/system.hooks'
import { removeAcademyPost } from 'ui/redux/slices/academy/academy.slice'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import { AppDispatch } from 'ui/redux/store'
import style from './DeleteLesson.module.scss'

const DeleteLesson = ({
  data,
  onClose
}: {
  data: { id: number; status: string }
  onClose: Function
})=>{
  const { wpToken } = useSelector(getUserLogged);
  const {pushInfoApp} = useSystem()
  const dispatch = useDispatch<AppDispatch>()
  const [loading, setloading] = useState(false)
  const router = useRouter()
  const onDelete = async () => {
    setloading(true)
    if(wpToken){
      await LessonRepositoryInstance.delete(data.id, wpToken);
      dispatch(removeAcademyPost(data))
      onClose()
    }
    else{
      alert('Unauthorized')
    }
    
    router.push({
      pathname: `/academy/courses/${router.query['course-slug']}`,
      query: router.query
    })
    pushInfoApp(new InfoApp({code: 'message.item.deleted', message:'The item was deleted'}, 'success'));

    setloading(false)
  }

  return (
    <DeleteLessonView loading={loading} onDelete={onDelete}  onClose={onClose}/>
  )
}

const DeleteLessonView  = ({
  onClose,
  onDelete,
  loading
}: {
  onDelete:Function
  onClose: Function
  loading: boolean
}) => {
  
  return (
    <Modal onBtnClose={() => onClose()}>
      <div className={style.cardContainer}>
        <div className={style.header}>
          <h3 className={style.formTitle}>
            <FormattedMessage id='page.academy.courses.delete.title'></FormattedMessage>
          </h3>
        </div>
        <p>
          <FormattedMessage id='page.academy.courses.delete.menssage'></FormattedMessage>
        </p>
        <div className={style.actions}>
          <ButtonApp labelID='alert.btn.cancel' onClick={() => onClose()}/>
          <ButtonApp labelID='alert.btn.ok' onClick={()=>onDelete()} buttonStyle='primary'/>
        </div>
      </div>
      <Loading loading={loading}></Loading>
    </Modal>
  )
}

export default DeleteLesson
