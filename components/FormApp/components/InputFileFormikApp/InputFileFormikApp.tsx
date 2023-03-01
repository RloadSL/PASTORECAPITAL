/* eslint-disable @next/next/no-img-element */
import Loading from 'components/Loading'
import { useField } from 'formik'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import style from './InputFileFormikApp.module.scss'

export interface TEXTAREAAPPPROPS {
  labelID: any
  thumb?: boolean
  name: string
  icon?: any
  accept?: string
  onChange?:Function
}

const InputFileFormikApp = ({
  labelID,
  name,
  icon,
  onChange,
  accept,
  thumb = true
}: TEXTAREAAPPPROPS) => {
  const [field, meta, form] = useField({ name })
  const [file, setFile] = useState<any>()
  const [fileName, setFileName] = useState<string>()
  const [loading,setLoading] = useState(false)
  const makeThumb = (files: FileList) => {
    let reader = new FileReader()
    reader.onloadend = () => {
      setFile(reader.result)
      setFileName(files[0].name)
      setLoading(false)
    }
    setLoading(true)
    reader.readAsDataURL(files[0])
  }
  return (
    <div className={style.inputFileContainer}>
      <Loading loading={loading}/>
      <label className={style.inputContainer}>
        {((file && thumb) || (field.value && thumb)) && (
          <img
            src={file || field.value}
            alt={'preview'}
            className='img-thumbnail mt-2'
            style={{ width: '100%', objectFit: 'cover' }}
          />
        )}
        {!thumb && fileName ? (
          <p>{fileName}</p>
        ) : !thumb && field.value ? (
          <a
            target={'_blank'}
            rel='noreferrer'
            style={{
              textDecoration: 'underline',
              padding: '5px',
              cursor: 'pointer'
            }}
            href={field.value}
          >
            Ver archivo existente
          </a>
        ) : (
          ''
        )}
        {!file && <div className={style.noFile}></div>}
        <span>
          {!file && <FormattedMessage id={labelID} />}
          <input
            type={'file'}
            hidden
            name={name}
            accept={accept}
            onChange={e => {
              const files = e.target.files as FileList
              if(form) form.setValue(files[0])
              if(onChange) onChange(files[0])
              makeThumb(files)
            }}
            className={style.input}
          />
        </span>
      </label>
      {meta.error && meta.touched && (
        <div className={style.error}>{meta.error}</div>
      )}
    </div>
  )
}
export default InputFileFormikApp
