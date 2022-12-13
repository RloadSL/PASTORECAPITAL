import AvatarName from 'components/AvatarName'
import ButtonApp from 'components/ButtonApp'
import Card from 'components/Card'
import style from './clientList.module.scss'

interface ClientListProps {
  clients: Array<any>
}

/**
 * Compoennte para renderizar el listado de clientes en el dashboard del asesor
 * @param clients Listado de clientes 
 * @returns 
 */

const ClientList = ({ clients }: ClientListProps) => {
  return <ClientListView clients={clients}></ClientListView>
}

const ClientListView = ({ clients }: ClientListProps) => {
  const maxClients = 4

  return (
    <Card cardStyle={'modal'}>
      <div className={`${style.cardContainer} ${style.clientList}`}>
        {clients.length != 0 ? (
          <ul>
            {clients.slice(0, maxClients).map((client: any, index: number) => {
              return <li key={index}>
                <div className={style.client}>
                  <div className={style.avatarBlock}>
                    <AvatarName userName={`${client.name} ${client.lastname}`} />
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
    </Card>

  )
}

export default ClientList;