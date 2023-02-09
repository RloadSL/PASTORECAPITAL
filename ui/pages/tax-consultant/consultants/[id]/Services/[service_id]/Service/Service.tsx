import ButtonApp from 'components/ButtonApp'
import style from './service.module.scss'
import Image from 'next/image'

import { useRouter } from 'next/router'

import serviceRepository from 'infrastructure/repositories/service.repository'
import { useEffect, useState } from 'react'
import ServiceModel from 'domain/Service/Service'
import Loading from 'components/Loading'
import { useSelector } from 'react-redux'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'

const Service = () => {
  const { service_id } = useRouter().query
  const [service, setService] = useState<ServiceModel | undefined>()
  
  useEffect(() => {
    let fetch = true
    if (service_id) {
      serviceRepository.getService(service_id as string).then(s => {
        if (fetch) setService(s)
      })
    }

    return () => {
      fetch = false
    }
  }, [service_id])

  return <ServiceView service={service} />
}

const ServiceView = ({ service }: { service: ServiceModel | undefined }) => {
  const { asPath, route, push, query } = useRouter()
  const [isOwner, setisOwner] = useState(true)
  const userLogged = useSelector(getUserLogged)

  useEffect(() => {
    if(service){
      service.isOwner(userLogged?.uid).then((res) => setisOwner(res))
    }
  }, [service, userLogged?.uid])
  
  const _handleNavigate = () => {
    const queryParams = `order_id=${query.service_id}&order_path=services`
    push(route + `/payment?${queryParams}`, asPath + `payment?${queryParams}`)
  }
  if (!service) {
    return <Loading loading={true} />
  } else
    return (
      <div className={style.serviceDetail}>
        <header>
          <p className='small-caps'>Servicio</p>
          <h1 className='main-title'>{service.title}</h1>
        </header>
        {service.image?.url && (
          <div className={style.serviceImage}>
              <Image
                layout='fill'
                objectFit='cover'
                src={service.image.url}
                alt='Imagen de detalle del servicio'
              />
          </div>
        )}
        <div className={style.serviceDetailContent}>
          {service.description}
          {(service.functions && service.functions.length > 0) && (
            <div>
              <h2>¿Cómo funciona?</h2>
              <ul>
                {service.functions.map((listItem, index) => {
                  return (
                    <li key={index}>
                      <span className={style.listNumber}>{index + 1}.</span>
                      <span>{listItem}</span>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
        </div>
        <footer>
          <div className={style.priceInfo}>
            <div className={style.priceInfo_container}>
              <p className={style.priceLabel}>Precio total:</p>
              <p className={style.priceQty}>{service.price}€</p>
            </div>
            <small>IVA incluido</small>
          </div>
          <div className={style.priceButtonContainer}>
            <div className={style.priceButton}>
              {!isOwner && <ButtonApp
                onClick={_handleNavigate}
                labelID='btn.hire'
                buttonStyle={'primary'}
              />}
            </div>
          </div>
        </footer>
      </div>
    )
}

export default Service
