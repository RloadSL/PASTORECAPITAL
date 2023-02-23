import InputFileFormikApp from 'components/FormApp/components/InputFileFormikApp'
import webinarsRepository from 'infrastructure/repositories/webinars.repository'
import { NextPage } from 'next'
import { useState } from 'react'
import style from './webinars.module.scss'

 const Webinars = () => {
  const [progress, setProgress] = useState(0)
  const upload = (files:any)=>{
    const file = files[0]

    if(file){
      webinarsRepository.uploadDeferredVideo('123', file, setProgress)
    }
  }

  return <div>
    <h1>Webinars</h1>
    <div>
      <span> {progress}%</span>
      <input type={'file'} onChange={({target})=>upload(target.files)}/>
    </div>
  </div>
}

export default Webinars