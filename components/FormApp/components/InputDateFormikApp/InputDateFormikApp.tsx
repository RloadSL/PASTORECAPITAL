import AlertApp from 'components/AlertApp'
import style from './InputFormikApp.module.scss'
import { useField } from 'formik'
import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import Image from 'next/image'
import { FormattedMessage } from 'react-intl'
import 'react-calendar/dist/Calendar.css'
import InputFormikApp from '../InputFormikApp'
import Modal from 'components/Modal'
import ButtonApp from 'components/ButtonApp'
function InputDateFormikApp ({
  labelID,
  icon,
  error,
  time,
  name,
  onBlur,
  inputStyle,
  disabled,
  maxLength,
  helper
}: any) {
  const [field, meta, form] = useField({ name })
  const [openCalendar, setOpenCalendar] = useState<boolean>(false)
  return (
    <div>
      <div
        className={`${style.inputContainer} ${style.isFloating} ${
          error ? style.hasError : ''
        } ${error ? style.hasError : ''} ${
          inputStyle ? style[inputStyle] : ''
        }`}
      >
        {labelID && (
          <label
            htmlFor={name}
            className={`${icon ? style.iconLabel : style.label}`}
          >
            <span>
              <FormattedMessage id={labelID} />
            </span>
          </label>
        )}
        <div className='flex-container row align-center'>
          {icon != undefined && (
            <div className={`${style.icon}`}>
              <Image className={style.icon} src={icon} alt='' />
            </div>
          )}
          <input
            {...field}
            value={`${(field.value as Date).toLocaleDateString()} ${(field.value as Date).toLocaleTimeString('es-ES', {hour: '2-digit', minute: '2-digit'})}`}
            maxLength={maxLength}
            type={'text'}
            disabled={disabled}
            autoComplete={'autocomplete'}
            placeholder={`dd/mm/yyyy ${time ? ' 00:00' : ''}`}
            onClick={() => setOpenCalendar(true)}
            onBlur={() => {
              if (onBlur) onBlur()
            }}
            className={style.input}
          />
        </div>
        {helper && !meta.error && (
          <small className={style.helper}>
            {' '}
            <FormattedMessage id={helper} />{' '}
          </small>
        )}
      </div>
      {meta.error && meta.touched && (
        <div className={style.error}>{meta.error}</div>
      )}
      {openCalendar && <Modal onBtnClose={() => setOpenCalendar(false)}>
        <div className={style.modalContainer}>
          <p className={style.modalContainer_title}>Elige una fecha</p>
          <Calendar value={field.value} onChange={(e:Date)=>{
            const date = field.value as Date
            date.setDate(e.getDate())
            date.setMonth(e.getMonth())
            date.setFullYear(e.getFullYear())
            form.setValue(date)
          }} />
          <div className={style.timeContainer}>
            <p>Hora en formato 24 horas</p>
            <div className={style.timeContainer_inputs}>
            <label>
              <input value={(field.value as Date).getHours().toString().padStart(2, '0')} type={'number'} placeholder='horas' max={24} step={1} min={0}
              onChange={({target})=>{
               const date = field.value as Date
               date.setHours(parseInt(target.value))
               form.setValue(date)
              }}
              />
              <span>:</span>
            </label>

            <label>
              <input value={(field.value as Date).getMinutes().toString().padStart(2, '0')} type={'number'} onChange={({target})=>{
                const date = field.value as Date
                date.setMinutes(parseInt(target.value))
                form.setValue(date)
              }} placeholder='min' max={59} step={1} min={0} />

            </label>
            </div>
          </div>
          <div className={style.buttonContainer}>
          <ButtonApp buttonStyle={'primary'}  labelID='btn.accept' onClick={()=>setOpenCalendar(false)}/>
          </div>
        </div>
      </Modal>}
    </div>
  )
}

export default InputDateFormikApp
