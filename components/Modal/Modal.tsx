import ButtonApp from 'components/ButtonApp'
import React from 'react'
import style from './Modal.module.scss'
const Modal = ({children, onClickBackDrop = ()=>null, onBtnClose}:{children: any, onClickBackDrop?:Function, onBtnClose?:Function}) => {
  return (
   <ModalView onClickBackDrop={onClickBackDrop} onBtnClose={onBtnClose ? ()=>onBtnClose() : undefined}>
      {children}
   </ModalView>
  )
}

const ModalView = ({children, onClickBackDrop, onBtnClose}:{children: any, onClickBackDrop:Function, onBtnClose?:Function}) => {
  return (
    <div className={style.modal_container}>
      <div className={style.backdrop} onClick={(e)=>onClickBackDrop()}>
          
        <div className={style.content}>
           { onBtnClose && <div className={style.close_btn}>
              <ButtonApp buttonStyle='default' onClick={()=>onBtnClose()} labelID='component.modal.close'></ButtonApp>
            </div>
            }
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal;