/* eslint-disable @next/next/no-img-element */
import { useField } from 'formik'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import style from './InputFileFormikApp.module.scss'

export interface TEXTAREAAPPPROPS {
  labelID: any
  onChange?: Function
  onBlur?: Function
  error?: string | undefined
  placeholder?: string
  name: string
  maxLength?: number
  icon?: any
  value?: string
  helper?: string
  accept?:string
}

const InputFileFormikApp = ({
  labelID,
  name,
  icon,
  accept
}: TEXTAREAAPPPROPS) => {
  const [field, meta, form] = useField({ name })
  const [file, setFile] = useState<any>()
  

  const makeThumb = (files: FileList) => {
    let reader = new FileReader()
    reader.onloadend = () => {
      setFile(reader.result)
    }
    reader.readAsDataURL(files[0])
  }

  return (
    <div className='position-relative'>
      <label className={style.inputContainer}>
        {file && (
          <img
            src={file}
            alt={file.name}
            className='img-thumbnail mt-2'
            style={{width: '100%', objectFit: 'cover'}}
          />
        )}
        <div className='flex-container row align-center'>
          <div className={`${style.icon}`}>
            {icon != undefined && (
              <Image className={style.icon} src={icon} alt='' />
            )}
          </div>
          {<FormattedMessage id={labelID} />}
          <input
            type={'file'}
            hidden
            name={name}
            accept={accept}
            onChange={e => {
              const files = e.target.files as FileList
              form.setValue(files[0])
              makeThumb(files)
            }}
            className={style.input}
          />
        </div>
      </label>
      {meta.error && meta.touched && (
        <div className={style.error}>{meta.error}</div>
      )}
    </div>
  )
}
export default InputFileFormikApp
