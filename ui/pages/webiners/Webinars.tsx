import ButtonApp from 'components/ButtonApp'
import InputFileFormikApp from 'components/FormApp/components/InputFileFormikApp'
import Modal from 'components/Modal'
import { Webinars } from 'domain/Webinars/Webinars'
import webinarsRepository from 'infrastructure/repositories/webinars.repository'
import { NextPage } from 'next'
import { useState } from 'react'
import SetWebinar from './components/CreateWebinar/SetWebinar'
import style from './webinars.module.scss'

 const Webinars = () => {
  const [openedit, setopenedit] = useState(false)
  const onSetWebiinars = (webinar:Webinars)=>{

  }

  return <div>
    <h1>Webinars</h1>
    <div>
      <ButtonApp onClick={()=>setopenedit(true)}>Open edit</ButtonApp>
    </div>
    <div>
      {openedit && 
         <Modal onBtnClose={() =>setopenedit(false)}>
                  <SetWebinar onCreate={(value:any)=>console.log(value)}/>

         </Modal>}
    </div>
  </div>
}

export default Webinars