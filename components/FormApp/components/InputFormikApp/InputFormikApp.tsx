/* eslint-disable react-hooks/exhaustive-deps */
import { FieldHookConfig, useField } from 'formik'
import Image from 'next/image'
import React, {
  useEffect,
  useState,
  useRef,
  useCallback
} from 'react'
import { FormattedMessage } from 'react-intl'
import style from './InputFormikApp.module.scss'

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
  value?:string,
  disabled?:boolean
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

const InputFormikApp = ({
  labelID,
  icon,
  error,
  placeholder,
  name,
  onChange,
  onBlur,
  inputStyle,
  type = 'text',
  disabled,
  maxLength,
  helper,
  value,
  
}: INPUTBLOCKPROPS) => {
  const [field, meta] = useField({name});
  const [isFloating, setIsFloating] = useState('')

  useEffect(() => {
    setIsFloating(
      field.value ? `${style.filled} ${style.label}` : style.label
    )
  }, [field.value])

  return (
    <>
      <div
        className={`${style.inputContainer} ${error ? style.hasError : ''} ${error ? style.hasError : ''
          } ${inputStyle ? style[inputStyle] : ''}`}
      >
        {labelID && (<label
          htmlFor={name}
          className={`${icon ? style.iconLabel : style.label} ${isFloating}`}
        >
          <span>
            <FormattedMessage id={labelID} />
          </span>
        </label>)}
        <div className='flex-container row align-center'>
          {icon != undefined && (
            <div className={`${style.icon}`}>
              <Image className={style.icon} src={icon} alt='' />
            </div>
          )}
          <input
            {...field}
            maxLength={maxLength}
            type={type}
            disabled={disabled}
            name={name}
            autoComplete={'autocomplete'}
            placeholder={placeholder}
            onBlur={() => {
              if (onBlur) onBlur()
            }}
            className={style.input}
          />
        </div>
        {(helper && !meta.error) && <small className={style.helper}> <FormattedMessage id={helper} /> </small>}
      </div>
      {(meta.error && meta.touched)&& <div className={style.error}>{meta.error}</div>}
    </>
  )
}

export default InputFormikApp
