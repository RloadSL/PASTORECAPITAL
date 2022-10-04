/* eslint-disable react-hooks/exhaustive-deps */
import Image from 'next/image'
import React, {
  useEffect,
  useState,
  useRef,
  useCallback
} from 'react'
import { FormattedMessage } from 'react-intl'
import style from './InputApp.module.scss'

type TYPEINPUT = 'email' | 'password' | 'number' | 'text'

export interface INPUTBLOCKPROPS {
  labelID: any
  onChange?: Function
  onBlur?: Function
  type: TYPEINPUT
  error?: string | undefined
  placeholder?: string
  name: string
  maxLength?: number
  inputStyle?: 'default' | 'code'
  icon?: any,
  helper?: string,
  value?:string
}

/**
 * Función principal del componente Input: Text | password | number | email del formulario
 * @param  labelID Key del json de traducción
 * @param  onChange Función para controlar el onchange de los inputs
 * @param  onBlur Función para controlar la pérdida del foco en los inputs
 * @param  type Tipo de campo de formulario
 * @param  error Error del campo de formulario
 * @param  placeholder Placeholder del campo
 * @param  name Name del campo
 * @param  inputStyle Estilo CSS del input default | code
 * @param  maxLength Longitud de entrada
 * @returns
 */

const InputApp = ({
  labelID,
  icon,
  error,
  placeholder,
  name,
  onChange,
  onBlur,
  inputStyle,
  type = 'text',
  maxLength,
  helper,
  value
}: INPUTBLOCKPROPS) => {
  const [isFloating, setIsFloating] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const [inputValue, setvalue] = useState('')
  useEffect(() => {
    inputRef.current?.setAttribute('value', value || '');
    setvalue(value || '')
    console.log(value)
  }, [value])
  

  const _handleChange = useCallback(
    (target: HTMLInputElement) => {
      if (maxLength && target.value.length > maxLength)
        target.value = target.value.substring(0, 4)
      if (onChange) onChange(name, target.value)
      setvalue(target.value)
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
      <div
        className={`${style.inputContainer} ${error ? style.hasError : ''} ${error ? style.hasError : ''
          } ${inputStyle ? style[inputStyle] : ''}`}
      >
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
          <input
            maxLength={maxLength}
            type={type}
            name={name}
            autoComplete={'autocomplete'}
            placeholder={placeholder}
            value={inputValue}
            ref={inputRef}
            onChange={e => _handleChange(e.target)}
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

export default InputApp
