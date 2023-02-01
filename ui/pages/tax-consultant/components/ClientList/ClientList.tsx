import AvatarName from 'components/AvatarName'
import ButtonApp from 'components/ButtonApp'
import Card from 'components/Card'
import { User } from 'domain/User/User'
import { useState } from 'react'
import style from './clientList.module.scss'
import ManageAppointment from './components/ManageAppointment'

interface ClientListProps {
  clients: Array<User>
}

/**
 * Componente para renderizar el listado de clientes en el dashboard del asesor
 * @param clients Listado de clientes 
 * @returns 
 */

const ClientList = ({ clients }: ClientListProps) => {
  return <ClientListView clients={clients}></ClientListView>
}

const ClientListView = ({ clients }: ClientListProps) => {
  const maxClients = 4
  const [userSelected, setUserSelected] = useState<User | undefined>()
  return (
    <div>
    <Card cardStyle={'modal'}>
      <div className={`${style.cardContainer} ${style.clientList}`}>
        {clients.length != 0 ? (
          <ul>
            {clients.slice(0, maxClients).map((client: any, index: number) => {
              return <li key={index}>
                <div className={style.client}>
                  <div className={style.avatarBlock}>
                    <AvatarName subtitle={client.serviceTitle} userName={`${client.user.name} ${client.user.lastname}`} />
                  </div>
                  <div className={style.buttonBlock}>
                    <ButtonApp
                      labelID='Gestionar'
                      type='submit'
                      buttonStyle='dark'
                      size={'small'}
                    />
                  </div>

                </div>
              </li>
            }
            )}
          </ul>
        ) : (
          <div className={style.emptyContent}>
            <p>No tienes clientes todavía</p>
          </div>
        )}

      </div>
      {userSelected && <ManageAppointment/>}
    </Card>
    </div>

  )
}

export default ClientList;