import Image from 'next/image'
import React, {
  useEffect,
  useState,
  useRef,
  useCallback
} from 'react'
import { FormattedMessage } from 'react-intl'
import style from './TextareaApp.module.scss'

export interface TEXTAREAAPPPROPS {
  labelID: any
  onChange?: Function
  onBlur?: Function
  error?: string | undefined
  placeholder?: string
  name: string
  maxLength?: number
  // inputStyle?: 'default' | 'code'
  icon?: any,
  helper?: string
}


const TextareaApp = ({
  labelID,
  onChange,
  onBlur,
  error,
  placeholder,
  name,
  maxLength,
  icon,
  helper }: TEXTAREAAPPPROPS) => {

  console.log('textareaaaa', error)
  return <TextareaAppView labelID={labelID} onChange={onChange} onBlur={onBlur} error={error} placeholder={placeholder} name={name} maxLength={maxLength} icon={icon} helper={helper} />
}

const TextareaAppView = ({
  labelID,
  onChange,
  onBlur,
  error,
  placeholder,
  name,
  maxLength,
  icon,
  helper }: TEXTAREAAPPPROPS) => {
  const [isFloating, setIsFloating] = useState('')
  const inputRef = useRef<any>(null)

  const _handleChange = useCallback(
    (target: HTMLInputElement) => {
      if (maxLength && target.value.length > maxLength)
        target.value = target.value.substring(0, 4)
      if (onChange) onChange(name, target.value)
      setIsFloating(
        inputRef?.current?.value
          ? `${style.filled} ${style.label}`
          : style.label
      )
    },
    [onChange, name]
  )

  useEffect(() => {
    setIsFloating(
      inputRef?.current?.value ? `${style.filled} ${style.label}` : style.label
    )
  }, [inputRef?.current?.value])

  return (
    <>
      <div className={style.inputContainer}>
        <label
          className={`${icon ? style.iconLabel : style.label} ${isFloating}`}
        >
          <span>
            <FormattedMessage id={labelID} />
          </span>
        </label>
        <div className='flex-container row align-center'>
          {icon != undefined && (
            <div className={`${style.icon}`}>
              <Image className={style.icon} src={icon} alt='' />
            </div>
          )}
          <textarea
            maxLength={maxLength}
            name={name}
            autoComplete={'autocomplete'}
            placeholder={placeholder}
            ref={inputRef}
            onChange={(e: any) => _handleChange(e.target)}
            onBlur={() => {
              if (onBlur) onBlur()
            }}
            className={style.input}
          />
        </div>
        {(helper && !error) && <small className={style.helper}> <FormattedMessage id={helper} /> </small>}
      </div>
      {error && <div className={style.error}>{error}</div>}
    </>
  )
}
export default TextareaApp