import { useEffect } from "react"
import { FormattedMessage } from "react-intl"
import style from './InputCheckApp.module.scss'

type TYPEINPUT = 'email' | 'password' | 'number' | 'text'

export interface INPUTBLOCKPROPS {
  labelID: string,
  onChange?: Function,
  onBlur?: Function,
  type: TYPEINPUT,
  error?: string | undefined,
  placeholder?: string,
  value?: any,
  name: string
}

/**
 * Función de componente principal de Botón
 * @param  labelID Key del json de traducción
 * @param  onChange Función para controlar el onchange de los inputs
 * @param  onBlur Función para controlar la pérdida del foco en los inputs
 * @param  type Tipo de campo de formulario
 * @param  error Error del campo de formulario
 * @param  placeholder Placeholder del campo
 * @param  value Valor del campo
 * @param  name Name del campo 
 * @returns 
 */

const InputCheckApp = ({ labelID, error, placeholder, value, name, onChange, onBlur, type = 'text' }: INPUTBLOCKPROPS) => {
  return (
    <div className={style.inputContainer}>
      <label className="form__group-label">
        <span>
          <FormattedMessage id={labelID} />
        </span>
        <div >
          <input
            type={type}
            name={name}
            autoComplete={'autocomplete'}
            placeholder={placeholder}
            value={value}
            onChange={(el)=>{if(onChange) onChange(name, el.target.value)}}
            onBlur={()=>{if(onBlur) onBlur()}}
            className={style.input}
          />
        </div>
      </label>
      {error && (
        <div className="text-danger">{error}</div>
      )}
    </div>
  )
}

export default InputCheckApp