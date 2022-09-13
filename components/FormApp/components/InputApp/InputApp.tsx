import React, { ChangeEventHandler, useEffect, useState, useRef, useCallback } from "react"
import { FormattedMessage } from "react-intl"
import style from './InputApp.module.scss'

type TYPEINPUT = 'email' | 'password' | 'number' | 'text'

export interface INPUTBLOCKPROPS {
  labelID: any,
  onChange?: Function,
  onBlur?: Function,
  type: TYPEINPUT,
  error?: string | undefined,
  placeholder?: string,
  name: string,
  inputStyle?: 'default' | 'code'
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
 * @returns 
 */

const InputApp = ({ labelID, error, placeholder, name, onChange, onBlur, inputStyle, type = 'text' }: INPUTBLOCKPROPS) => {
  const [isFloating, setIsFloating] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const _handleChange = useCallback(
    (target: HTMLInputElement) => {
      if (onChange) onChange(name, target.value)
      setIsFloating(inputRef?.current?.value ? `${style.filled} ${style.label}` : style.label)
    }, [onChange]
  ) 
  
  useEffect(() => {
    setIsFloating(inputRef?.current?.value ? `${style.filled} ${style.label}` : style.label)
  }, [inputRef?.current?.value])
  return (
    <>
      <div className={`${style.inputContainer} ${error ? style.hasError : ''} ${error ? style.hasError : ''} ${inputStyle ? style[inputStyle] : ''}`} >
        <label className={`${style.label} ${isFloating}`}>
          <span>
            <FormattedMessage id={labelID} />
          </span>
        </label>
        <div>
          <input
            type={type}
            name={name}
            autoComplete={'autocomplete'}
            placeholder={placeholder}
            ref={inputRef}
            onChange={(e) => _handleChange(e.target)}
            onBlur={() => { if (onBlur) onBlur() }}
            className={style.input}
            maxLength={9999}
          />
        </div>
      </div>
      {error && (
        <div className={style.error}>{error}</div>
      )}
    </>
  )
}

export default InputApp