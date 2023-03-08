import ButtonApp from 'components/ButtonApp'
import Loading from 'components/Loading'
import Modal from 'components/Modal'
import { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import style from './AlertApp.module.scss'

const AlertApp = ({
  onAction,
  title,
  children,
  visible,
  onCancel,
  cancelButton
}: {
  title: string
  onAction?: Function
  onCancel?: Function
  children: any
  visible: boolean,
  cancelButton?: boolean
}) => {
  const [loading, setloading] = useState(false)

  const _onAction = async () => {
    if (!onAction) return;
    setloading(true)
    await onAction()
    setloading(false)
  }

  return visible ? (
    <AlertAppView
      title={title}
      loading={loading}
      onOk={onAction ? () => _onAction() : undefined}
      onCancel={onCancel}
      cancelButton={cancelButton}
    >
      {children}
    </AlertAppView>
  ) : (
    <></>
  )
}

const AlertAppView = ({
  onCancel,
  title,
  onOk,
  loading,
  children,
  cancelButton = true
}: {
  title: string
  onCancel?: Function
  onOk?: Function
  loading: boolean
  children: any,
  cancelButton?: boolean
}) => {
  return (
    <Modal onBtnClose={onCancel}>
      <div className={style.cardContainer}>
        <div className={style.content}>
          <div className={style.header}>
            <h3 className={style.formTitle}>
              <FormattedMessage id={title}></FormattedMessage>
            </h3>
          </div>
          {children}
        </div>
        {onOk && <div className={style.actions}>
          {(cancelButton === true &&  onCancel) && (
            <div className={style.buttonContainer}>
              <ButtonApp labelID='alert.btn.cancel' onClick={() => onCancel()} />
            </div>
          )}
          <div className={style.buttonContainer}>
            <ButtonApp
              labelID='alert.btn.ok'
              onClick={() => onOk()}
              buttonStyle='primary'
            />
          </div>

        </div>}
      </div>
      <Loading loading={loading}></Loading>
    </Modal>
  )
}

export default AlertApp
