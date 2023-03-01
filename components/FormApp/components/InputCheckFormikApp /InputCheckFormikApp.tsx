import { useField } from "formik";
import { FormattedMessage } from "react-intl"
import style from './InputCheckFormikApp.module.scss'

export interface INPUTCHECKBLOCKPROPS {
  labelID: string,
  onBlur?: Function,
  error?: string | undefined,
  name: string,
  formattedValues?: any
  value: any
  children: any
}

/**
 * Función principal del componente checkbox del formulario
 * @param  labelID Key del json de traducción
 * @param  onChange Función para controlar el onchange de los inputs
 * @param  onBlur Función para controlar la pérdida del foco en los inputs
 * @param  error Error del campo de formulario
 * @param  name Name del campo
 * @param  formattedValues Formateo para texto enriquecido
 * @returns 
 */

const InputCheckFormikApp = ({children, value, error, name, onBlur, checked }: any) => {
  const [field, meta] = useField({name, value, type: "checkbox" });
  return (
    <>
      <div className={error ? `${style.hasError} ${style.inputContainer}` : style.inputContainer}>
        <label className={style.label}>
          <div>
            <input
              {...field}
              type = "checkbox"
              checked = {checked}
              onBlur={() => { if (onBlur) onBlur() }}
              className={style.input}
            />
          </div>
          <span>
            {children}
          </span>
        </label>
      </div>
      {meta.error && (
        <div className={style.error}>{meta.error}</div>
      )}
    </>
  )
}

export default InputCheckFormikApp