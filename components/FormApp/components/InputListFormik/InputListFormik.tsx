import ButtonApp from 'components/ButtonApp'
import { useField } from 'formik'
import { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import InputFormikApp from '../InputFormikApp'
import style from './InputListFormik.module.scss'

const InputListFormik = ({ name, labelID, items = [] }: any) => {
  const [form, field] = useField({ name })
  const [itemsLits, setItems] = useState<string[]>(items)

  const _addItem = ()=>{
    setItems([...itemsLits, ''])
  }

  const _removeItem = (index:number)=>{
    itemsLits.splice(1, index);
    setItems([...itemsLits])
  }

  return (
    <div className={style.listInputContainer}>
      <p><FormattedMessage id={labelID} /></p>
      {itemsLits.map((item: string, index: number) => {
        return (
          <div className='flex-container row align-center' key={index}>
            <div>{index}</div> <InputFormikApp labelID='' type='text' name='keywords' /> 
            <div style={{width: 80}}>
              <ButtonApp onClick={()=>_removeItem(index)} buttonStyle='secondary' type='button' labelID='-' />
            </div>
          </div>
        )
      })}
      <ButtonApp onClick={_addItem} buttonStyle='primary' type='button' labelID='btn.add-item' />
    </div>
  )
}

export default InputListFormik
