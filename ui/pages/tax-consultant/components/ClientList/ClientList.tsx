import AlertApp from 'components/AlertApp'
import AvatarName from 'components/AvatarName'
import ButtonApp from 'components/ButtonApp'
import Card from 'components/Card'
import Loading from 'components/Loading'
import { InfoApp } from 'domain/InfoApp/InfoApp'
import { User } from 'domain/User/User'
import { Unsubscribe } from 'firebase/firestore'
import { NotificationDto } from 'infrastructure/dto/notification.dto'
import notificationRepository from 'infrastructure/repositories/notification.repository'
import serviceRepository from 'infrastructure/repositories/service.repository'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useSystem } from 'ui/hooks/system.hooks'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import style from './clientList.module.scss'
import ManageAppointment from './components/ManageAppointment'

interface ClientListProps {
  clients: Array<any>
}

/**
 * Componente para renderizar el listado de clientes en el dashboard del asesor
 * @param clients Listado de clientes
 * @returns
 */

const ClientList = ({ clients }: ClientListProps) => {
  const maxClients = 4
  const [clientSelected, setclientSelected] = useState<any | undefined>()
  const userLogged = useSelector(getUserLogged)
  const { pushInfoApp } = useSystem()
  const [loading, setloading] = useState(false)
  const [stateClients, setstateClients] = useState(clients)
  const [completeClient, setCompleteClient] = useState()

  useEffect(() => {
    setstateClients(clients)
  }, [clients])

  const _handleCompleteUserService = async (item: any) => {
    const s_uid = item.user.uid + '_' + item.service_id
    const data: NotificationDto = {
      created_at: new Date(),
      message: 'Service complited by consultant',
      metadata: {
        service: item.serviceTitle,
        service_id: item.service_id
      },
      from: {
        fullname: `${userLogged.name} ${userLogged.lastname}`,
        email: userLogged.email,
        uid: userLogged.uid
      },
      to: {
        fullname: `${item.user.name} ${item.user.lastname}`,
        email: item.user.email,
        uid: item.user.uid
      },
      type: 'CONSULTANT_COMPLETE_USER_SERVICE'
    }
    setCompleteClient(undefined)
    setloading(true)
    await notificationRepository.create(data)
    _handleSubmit(item)
    pushInfoApp(
      new InfoApp(
        { code: 'message.sended', message: 'message.sended' },
        'success'
      )
    )
    setloading(false)
  }

  const unsub = useRef<Unsubscribe | undefined>()

  const _listenUserService = (snap: any) => {
    const { status, id } = snap
    const listenig = clients.findIndex(item => {
      const su_id = item.user.uid+'_'+item.service_id
      return su_id === id
    })
    
    if (status != clients[listenig].status) {
      clients[listenig].status = status
      setstateClients([...clients])
      if (unsub.current) unsub.current()
    }
  }

  const _handleSubmit = async (clinet: any) => {
    setclientSelected(undefined)
    const us_uid = clinet.user.uid + '_' + clinet.service_id

    unsub.current = await serviceRepository.listenChengeUserService(
      clinet.service_id,
      us_uid,
      _listenUserService
    )
  }

  return (
    <div>
      <Card cardStyle={'modal'}>
        <div className={`${style.cardContainer} ${style.clientList}`}>
          {stateClients.length != 0 ? (
            <ul>
              {stateClients
                .slice(0, maxClients)
                .map((client: any, index: number) => {
                  return (
                    <li key={client.user.uid + '_' + client.service_id}>
                      <div className={style.client}>
                        <div className={style.avatarBlock}>
                          <AvatarName
                            subtitle={client.serviceTitle}
                            userName={`${client.user.name} ${client.user.lastname}`}
                          />
                        </div>
                        <div className={style.buttonBlock}>
                          {client.status !== 'completed' ? (
                            <ButtonApp
                              labelID={
                                client.status === 'active'
                                  ? 'Completar'
                                  : 'Gestionar'
                              }
                              onClick={() =>
                                client.status === 'active'
                                  ? setCompleteClient(client)
                                  : setclientSelected(client)
                              }
                              type='submit'
                              buttonStyle={
                                client.status === 'active' ? 'primary' : 'dark'
                              }
                              size={'small'}
                            />
                          ) : (
                            <div>Completado</div>
                          )}
                        </div>
                      </div>
                    </li>
                  )
                })}
            </ul>
          ) : (
            <div className={style.emptyContent}>
              <p>No tienes clientes todavía</p>
            </div>
          )}
        </div>
        {<Loading loading={loading} />}
        {clientSelected && (
          <ManageAppointment
            onSubmit={_handleSubmit}
            onClose={() => setclientSelected(undefined)}
            client={clientSelected}
          />
        )}
      </Card>
      {completeClient && (
        <AlertApp
          visible={true}
          onCancel={() => setCompleteClient(undefined)}
          title={'Completar este servicio'}
          onAction={() => _handleCompleteUserService(completeClient)}
        >
          <div>
            Seguro quieres completar este servicio, este cambio no podra ser modificado posteriormente.
          </div>
        </AlertApp>
      )}
    </div>
  )
}

export default ClientList
