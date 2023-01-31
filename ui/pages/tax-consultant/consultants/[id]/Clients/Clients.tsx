import ClientList from '../../../components/ClientList'
import { clientsList } from 'ui/utils/test.data'
import style from './clients.module.scss'
import './clients.module.scss'
import ConsultantMenu from 'ui/pages/tax-consultant/components/ConsultantMenu'

interface ClientsProps {
}

const Clients = ({ }: ClientsProps) => {
  return <ClientsView />
}

const ClientsView = ({ }: ClientsProps) => {
  const clients: any = clientsList;

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