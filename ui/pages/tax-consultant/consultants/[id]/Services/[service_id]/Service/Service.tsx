import ButtonApp from 'components/ButtonApp'
import style from './service.module.scss'
import Image from 'next/image'
import LinkApp from 'components/LinkApp'
import { useRouter } from 'next/router'
import serviceImage from '../../../../../../../../assets/img/serviceImage.jpg'
import { serviceDetail } from 'ui/utils/test.data'
import serviceRepository from 'infrastructure/repositories/service.repository'
import { useEffect, useState } from 'react'
import ServiceModel from 'domain/Service/Service'
import Loading from 'components/Loading'


const Service = () => {
  const {service_id} = useRouter().query
  const [service, setService] = useState<ServiceModel | undefined>()
  useEffect(() => {
    let fetch = true;
    if(service_id){
      serviceRepository.getService(service_id as string)
      .then((s)=> {
        if(fetch) setService(s)
      })
    }
    
  
    return () => {
      fetch = false
    }
  }, [service_id])
  

  return <ServiceView service={service}/>
}

const ServiceView = ({service}:{service: ServiceModel | undefined}) => {
  const { asPath, route, push, query } = useRouter()
  
  const _handleNavigate = () => {
    const queryParams = `order_id=${query.service_id}&order_path=services`;
    push(
      route + `/payment?${queryParams}`,
      asPath + `payment?${queryParams}`
    )
  }
  if(!service) {
    return (<Loading loading={true}/>)
  }else return (
    <div className={style.serviceDetail}>
      <header>
        <p className='small-caps'>Servicio</p>
        <h1 className='main-title'>{service.title}</h1>
      </header>
      {serviceDetail.image && (
        <div className={style.serviceImage}>
          {service.image && <Image  src={service.image.url} alt='Imagen de detalle del servicio' />}
        </div>
      )}
      <div className={style.serviceDetailContent}>
        {service.description}
        {service.functions && (
          <div>
            <h2>¿Cómo funciona?</h2>
            <ul>
              {service.functions.map((listItem, index) => {
                return (
                  <li key={index}>
                    <span className={style.listNumber}>{index+1}.</span><span>{listItem}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        )}

      </div>
      <footer>
        <div className={style.priceInfo}>
          <div className='flex-container align-center justify-end'>
            <p className={style.priceLabel}>Precio total:</p>
            <p className={style.priceQty}>{service.price}€</p>
          </div>
          <small>IVA incluido</small>
        </div>
        <div className={style.priceButtonContainer}>
          <div className={style.priceButton}>
            <ButtonApp
              onClick={_handleNavigate}
              labelID='btn.hire'
              buttonStyle={'primary'}
            />
          </div>
        </div>
      </footer>      
    </div>
  )
}

export default Service
