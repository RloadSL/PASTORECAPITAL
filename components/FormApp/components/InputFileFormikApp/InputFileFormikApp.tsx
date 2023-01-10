import { useField } from 'formik'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import style from './InputFileFormikApp.module.scss'

export interface TEXTAREAAPPPROPS {
  labelID: any
  onChange?: Function
  onBlur?: Function
  error?: string | undefined
  placeholder?: string
  name: string
  maxLength?: number
  icon?: any
  value?: string
  helper?: string
}

const InputFileFormikApp = ({
  labelID,
  onBlur,

  placeholder,
  name,
  maxLength,
  icon,
  helper
}: TEXTAREAAPPPROPS) => {
  const [isFloating, setIsFloating] = useState('')
  const [field, meta] = useField({ name })

  useEffect(() => {
    setIsFloating(field.value ? `${style.filled} ${style.label}` : style.label)
  }, [field.value])

  return (
    <div className='position-relative'>
      <label className={style.inputContainer}>
        <div className='flex-container row align-start'>
          <div className={`${style.icon}`}>
            {icon != undefined && (
              <Image className={style.icon} src={icon} alt='' />
            )}
          </div>
          {<FormattedMessage id={labelID} />}
          <input
            type={'file'}
            hidden
            {...field}
            maxLength={maxLength}
            name={name}
            className={style.input}
          />
        </div>
      </label>
      {helper && !meta.error && (
        <small className={style.helper}>
          {' '}
          <FormattedMessage id={helper} />{' '}
        </small>
      )}
      {meta.error && meta.touched && (
        <div className={style.error}>{meta.error}</div>
      )}
    </div>
  )
}
export default InputFileFormikApp
