import { useEffect } from "react"
import { FormattedMessage } from "react-intl"

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

const InputApp = ({ labelID, error, placeholder, value, name, onChange, onBlur, type = 'text' }: INPUTBLOCKPROPS) => {

  return (
    <div className="form__group">
      <label className="form__group-label">
        <span>
          <FormattedMessage id={labelID} />
        </span>
        <div className="form__group-control">
          <input
            type={type}
            name={name}
            autoComplete={'autocomplete'}
            placeholder={placeholder}
            value={value}
            onChange={(el)=>{if(onChange) onChange(name, el.target.value)}}
            onBlur={()=>{if(onBlur) onBlur()}}
          />
        </div>
      </label>
      {error && (
        <div className="text-danger">{error}</div>
      )}
    </div>
  )
}

export default InputApp