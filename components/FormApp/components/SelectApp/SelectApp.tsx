/* eslint-disable react-hooks/exhaustive-deps */

import style from './SelectApp.module.scss'
import Select from 'react-select'
import { FormattedMessage } from 'react-intl'
import { useCallback } from 'react'
import Image from 'next/image'

interface SELECTAPPPROPS {
  labelID: string
  name: string
  icon?: any
  error?: string
  onChange?: Function
  selectOptions: Array<{ label: string; value: string }>
}

/**
 * Función principal del componente Select, utiliza el componente externo react-select
 * @param labelID Key del json de traducción
 * @param selectOptions Opciones del selector
 * @returns
 */

const SelectApp = ({
  labelID,
  selectOptions,
  onChange,
  name,
  error,
  icon
}: SELECTAPPPROPS) => {
  const _handleChange = useCallback(
    (value: { slug: string; label: string }) => {
      if (onChange) onChange(name, value)
    },
    []
  )

  return (
    <SelectAppView
      error={error}
      onChange={(value: any) => _handleChange(value)}
      name={name}
      labelID={labelID}
      selectOptions={selectOptions}
      icon={icon}
    />
  )
}

const SelectAppView = ({
  labelID,
  selectOptions,
  onChange,
  name,
  error,
  icon
}: SELECTAPPPROPS) => {
  const customStyles = {
    input: (provided: any, state: any) => ({
      ...provided,
      width: state.selectProps.width
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
            name={name}
            options={selectOptions}
            defaultValue={selectOptions.find(
              (item: any) => item.value === 'todos'
            )}
            styles={customStyles}
            isSearchable={false}
            onChange={value => (onChange ? onChange(value) : null)}
            components={{
              IndicatorSeparator: () => null,
              DropdownIndicator: () => null
            }}
          />
        </div>

      </div>
      {error && <div className={style.error}>{error}</div>}
    </div>
  )
}
export default SelectApp
