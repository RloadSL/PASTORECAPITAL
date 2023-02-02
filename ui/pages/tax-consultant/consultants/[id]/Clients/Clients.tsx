import ClientList from '../../../components/ClientList'
import { clientsList } from 'ui/utils/test.data'
import style from './clients.module.scss'
import './clients.module.scss'
import ConsultantMenu from 'ui/pages/tax-consultant/components/ConsultantMenu'
import { NextPage } from 'next'
import { useConsultant } from 'ui/hooks/consultant.hook'
import { useEffect, useState } from 'react'
import { UserConsultant } from 'domain/UserConsultant/UserConsultant'
import { User } from 'domain/User/User'



const Clients: NextPage = () => {
  const {consultant} = useConsultant();
  const [clients, setClients] = useState<any>([])

  useEffect(() => {
    if(consultant instanceof UserConsultant){
        consultant.getClients()
        .then(res => setClients(res))       
    }
   }, [consultant])
  return (
    <div className={style.clients}>
      <header>
        <ConsultantMenu />
      </header>
      <h1 className='small-caps'>Mis Clientes</h1>
      <div className={style.clientsList}>
        <ClientList clients={clients} />
      </div>
    </div>
  )
}

export default Clients;