import { useField } from 'formik'
import Image from 'next/image'
import React, {
  useEffect,
  useState,
  useRef,
  useCallback
} from 'react'
import { FormattedMessage } from 'react-intl'
import style from './TextareaFormikApp.module.scss'

export interface TEXTAREAAPPPROPS {
  labelID: any
  onChange?: Function
  onBlur?: Function
  error?: string | undefined
  placeholder?: string
  name: string
  maxLength?: number
  icon?: any,
  value?: string,
  helper?: string
}


const TextareaFormikApp = ({
  labelID,
  onBlur,

  placeholder,
  name,
  maxLength,
  icon,
  helper }: TEXTAREAAPPPROPS) => {
  const [isFloating, setIsFloating] = useState('')
  const [field, meta] = useField({name});

  useEffect(() => {
    setIsFloating(
      field.value ? `${style.filled} ${style.label}` : style.label
    )
  }, [field.value])

  return (
    <div className='position-relative'>
      <div className={style.inputContainer}>
        <label
          className={`${icon ? style.iconLabel : style.label} ${isFloating}`}
        >
          <span>
            <FormattedMessage id={labelID} />
          </span>
        </label>
        <div className='flex-container row align-start'>
          {icon != undefined && (
            <div className={`${style.icon}`}>
              <Image className={style.icon} src={icon} alt='' />
            </div>
          )}
          <textarea
           {...field}
            maxLength={maxLength}
            name={name}
            autoComplete={'autocomplete'}
            placeholder={placeholder}
            onBlur={() => {
              if (onBlur) onBlur()
            }}
            className={style.input}
          />
        </div>
      </div>
      {(helper && !meta.error) && <small className={style.helper}> <FormattedMessage id={helper} /> </small>}
      {(meta.error &&  meta.touched) && <div className={style.error}>{meta.error}</div>}
    </div>
  )
}
export default TextareaFormikApp