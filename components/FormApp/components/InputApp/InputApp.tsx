import React, { ChangeEventHandler, useEffect, useState, useRef } from "react"
import { FormattedMessage } from "react-intl"
import style from './InputApp.module.scss'

type TYPEINPUT = 'email' | 'password' | 'number' | 'text'

export interface INPUTBLOCKPROPS {
  labelID: string,
  onChange?: Function,
  onBlur?: Function,
  type: TYPEINPUT,
  error?: string | undefined,
  placeholder?: string,
  name: string
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
 * @returns 
 */

const InputApp = ({ labelID, error, placeholder, name, onChange, onBlur, type = 'text' }: INPUTBLOCKPROPS) => {
  const [isFloating, setIsFloating] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const _handleChange = (target: HTMLInputElement ) => {
    if (onChange) onChange(name, target.value)
    setIsFloating(inputRef?.current?.value ? `${style.filled} ${style.label}` : style.label)
   
  }
 useEffect(() => {
   setIsFloating(inputRef?.current?.value ? `${style.filled} ${style.label}` : style.label)
   console.log(inputRef?.current)
 }, [inputRef?.current?.value])
 
  return (
    <>
      <div className={error ? `${style.hasError} ${style.inputContainer}` : style.inputContainer}>
        <label className={isFloating}>
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
            onChange={(e)=>_handleChange(e.target)}
            onBlur={() => { if (onBlur) onBlur() }}
            className={style.input}
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