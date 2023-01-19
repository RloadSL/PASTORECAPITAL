import ButtonApp from 'components/ButtonApp'
import { useField } from 'formik'
import { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import InputFormikApp from '../InputFormikApp'
import style from './InputListFormik.module.scss'
import addIcon from '../../../../assets/img/icons/add.svg'

const InputListFormik = ({ name, labelID, items = ['aaa', 'bbb'] }: any) => {
  const [field, meta, form] = useField({ name })

  const _addItem = () => {
    form.setValue([...field.value, ''])
  }

  const _removeItem = (index: number) => {
    const l = [...field.value]
    l.splice(index, 1)
    form.setValue([...l])
  }

  return (
    <div className={style.listInputContainer}>
      <p><FormattedMessage id={labelID} /></p>
      {field.value.map((item: string, index: number) => {
        return (
          <div className={style.listItem} key={index}>
            <div className={style.listItemStep}>{index}</div> <InputFormikApp labelID='Detalle' type='text' name={`${name}.${index.toString()}`} />
            <div style={{ width: 80 }}>
              <ButtonApp onClick={() => _removeItem(index)} buttonStyle='secondary' type='button' labelID='-' />
            </div>
          </div>
        )
      })}
      <div className={style.buttonContainer}>
        <ButtonApp icon={addIcon} onClick={_addItem} buttonStyle='primary' type='button' labelID='btn.add-item' />
      </div>
    </div>
  )
}

export default InputListFormik
