
import style from './SelectApp.module.scss'
import Select from 'react-select';

interface SELECTAPPPROPS {
  labelID: string,
  selectOptions: Array<object>
}

/**
 * Función principal del componente Select, utiliza el componente externo react-select
 * @param labelID Key del json de traducción
 * @param selectOptions Opciones del selector
 * @returns
 */

const SelectApp = ({ labelID, selectOptions }: SELECTAPPPROPS) => {
  return <SelectAppView labelID={labelID} selectOptions={selectOptions}/>
}

const SelectAppView = ({ labelID, selectOptions }: SELECTAPPPROPS) => {
  const customStyles = {
    input: (provided: any, state: any) => ({
      ...provided,
      width: state.selectProps.width,
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
    <div className={style.selectContainer}>
      <label className={style.label}>
        {labelID}
      </label>
      <Select 
        instanceId={'select'}
        options={selectOptions} 
        defaultValue={selectOptions.find(( item:any ) => item.value === 'todos')}
        styles={customStyles}
        isSearchable={false}
        components={{
          IndicatorSeparator: () => null,
          DropdownIndicator: () => null
        }} 
      />
    </div>
  )

};
export default SelectApp

