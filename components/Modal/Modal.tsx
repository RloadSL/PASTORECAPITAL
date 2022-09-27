import Card from 'components/Card'
import style from './Modal.module.scss'

const Modal = ({ children, onClickBackDrop = () => null, onBtnClose }: { children: any, onClickBackDrop?: Function, onBtnClose?: Function }) => {
  return (
    <ModalView onClickBackDrop={onClickBackDrop} onBtnClose={onBtnClose ? () => onBtnClose() : undefined}>
      {children}
    </ModalView>
  )
}

const ModalView = ({ children, onClickBackDrop, onBtnClose }: { children: any, onClickBackDrop: Function, onBtnClose?: Function }) => {
  return (
    <div className={style.modal}>
      <div className={style.backdrop} onClick={(e) => onClickBackDrop()}>
        <div className={style.modalContainer}>
          <Card>
            <div className={style.content}>
              {onBtnClose && <button className={style.closeBtn} onClick={() => onBtnClose()}>
                <span className='only-readers'>Cerrar</span>
              </button>
              }
              {children}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Modal;