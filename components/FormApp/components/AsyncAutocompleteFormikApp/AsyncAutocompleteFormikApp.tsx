/* eslint-disable react-hooks/exhaustive-deps */

import style from './AsyncAutocompleteFormikApp.module.scss'
import Select from 'react-select/async'
import { FormattedMessage, useIntl } from 'react-intl'
import { useCallback, useEffect } from 'react'
import Image from 'next/image'
import { useField } from 'formik'

interface SELECTAPPPROPS {
  labelID: string
  loadOptions:Function
  name: string
  icon?: any
  error?: string
  onChange?: Function
}

/**
 * Función principal del componente Select, utiliza el componente externo react-select
 * @param labelID Key del json de traducción
 * @param name Name de la base de datos del input
 * @param icon Icono del input si lo tiene
 * @param error
 * @param onChange Función onChange del componente
 * @param selectOptions Lista de opciones del selector
 * @returns
 */

const AsyncAutocompleteFormikApp = ({
  labelID,
  name,
  icon,
  onChange,
  loadOptions
}: SELECTAPPPROPS) => {
  const intl = useIntl()
  const [field, meta, form] = useField({ name })

  const customStyles = {
    input: (provided: any, state: any) => ({
      ...provided,
      width: state.selectProps.width
    }),
    menu: (provided: any, state: any) => ({
      ...provided,
      zIndex: 999
    }),
    control: (provided: any, state: any) => ({
      ...provided,
      width: state.selectProps.width,
      border: '0px',
      backgroundColor: 'transparent',
      boxShadow: 'none',
      marginTop: '12px'
    })
  }

  return (
    <div>
      <div className={style.selectContainer}>
        <label className={`${icon ? style.iconLabel : style.label}`}>
          <FormattedMessage id={labelID}></FormattedMessage>
        </label>
        <div className='flex-container row align-center'>
          {icon != undefined && (
            <div className={`${style.icon}`}>
              <Image className={style.icon} src={icon} alt='' />
            </div>
          )}
          <Select
            className={style.select}
            instanceId={'select'}
            placeholder={intl.formatMessage({ id: ' ' })}
            name={name}
            noOptionsMessage={()=> (<>Escribe un email para realizar la búsqueda</>)}
            loadOptions={(inputValue: string) => loadOptions(inputValue)}
            inputId={name}
            styles={customStyles}
            isSearchable={true}
            onChange={(obj: any) => {
              form.setValue(obj.value)
              onChange && onChange({[field.name] : obj.value})
            }}
            components={{
              IndicatorSeparator: () => null,
              DropdownIndicator: () => null
            }}
          />
        </div>
      </div>
      {meta.error && meta.touched && (
        <div className={style.error}>{meta.error}</div>
      )}
    </div>
  )
}
export default AsyncAutocompleteFormikApp
