import ButtonApp from 'components/ButtonApp'
import Loading from 'components/Loading'
import Modal from 'components/Modal'
import { CourseRepositoryInstance } from 'infrastructure/repositories/courses.repository'
import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { removeCourse } from 'ui/redux/slices/academy/academy.slice'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import { AppDispatch } from 'ui/redux/store'
import style from './DeleteCourse.module.scss'

const DeleteCourse = ({
  data,
  onClose
}: {
  data: { id: number; status: string }
  onClose: Function
})=>{
  //const { wpToken } = useSelector(getUserLogged); //OJO ESTE ES EL BUENO
  const wpToken = ''; // BORRAR AL FINAL
  const dispatch = useDispatch<AppDispatch>()
  const [loading, setloading] = useState(false)
  const onDelete = async () => {
    setloading(true)
    if(wpToken){
      await CourseRepositoryInstance.delete(data.id, wpToken);
      dispatch(removeCourse(data))
      onClose()
    }
    else{
      alert('Unauthorized')
    }

    setloading(false)
  }

  return (
    <DeleteCourseView loading={loading} onDelete={onDelete}  onClose={onClose}/>
  )
}

const DeleteCourseView  = ({
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

export default DeleteCourse
