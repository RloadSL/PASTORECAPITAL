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
import SearchBar from 'components/SearchBar'
import { FormattedMessage } from 'react-intl'



const Clients: NextPage = () => {
  const { consultant } = useConsultant();
  const [clientsState, setClients] = useState<{clients: any[], filterClients:any[]}>({clients: [], filterClients:[]})

  useEffect(() => {
    if (consultant instanceof UserConsultant) {
      consultant.getClients()
        .then(res => setClients({clients: res, filterClients:res}))
    }
  }, [consultant])

  const onFilter = (s:string)=> {
    s = s.trim();
    if(s.length == 0) setClients(pre => ({clients: pre.clients, filterClients:pre.clients}))
    const filter = clientsState.clients.filter(item => {
      const json = JSON.stringify(item)
      return json.toLowerCase().indexOf(s.toLowerCase()) != -1
    })
    setClients(pre => ({...pre, filterClients: filter}))
  }

  return (
    <div className={style.clients}>
      <header>
        <ConsultantMenu />
      </header>
      <div className={style.clients_container}>
        <h1 className='main-title'>
          <FormattedMessage id={'page.tax-consultant.profile.clients.title'}/>
        </h1>
        <div className={style.filtersContainer}>
          <SearchBar
            enableTags={false}
            onFilter={(f: any) => {
              onFilter(f.search)
              console.log('hola')
            }}
          />
        </div>
        <div className={style.clientsList}>
          <ClientList clients={clientsState.filterClients} />
        </div>
      </div>
    </div>
  )
}

export default Clients;