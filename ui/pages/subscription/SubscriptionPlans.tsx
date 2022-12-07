import UnderConstruction from 'components/UnderConstruction';
import { FormattedMessage } from 'react-intl';
import style from './subscriptionPlans.module.scss'
import Image from 'next/image';
import checkImg from '../../../assets/img/check.svg'
import nocheckImg from '../../../assets/img/nocheck.svg'
import ButtonApp from 'components/ButtonApp';
import SwitcherButton from 'components/SwitcherButton';
import LinkApp from 'components/LinkApp';
import { useState } from 'react';
import { useRouter } from 'next/router'


const SubscriptionPlans = () => {
  return (
    <SubscriptionPlansView/>
  )
}

const SubscriptionPlansView = () => {
  const router = useRouter();
  const [paymentType, setPaymentType] = useState('monthly');
  const { paymentQuery } = router.query


  const selectSubscriptionPlan = (subscriptionType:any) => {
    // console.log('hola',paymentType)

    setPaymentType(subscriptionType);
    // console.log('hola',paymentQuery);
  }

  return (
    <div className={style.subscriptionPlansPage}>
      <header>
        <p className='small-caps'>Suscripción</p>
        <p className={`${style.topTitle} main-title`}>Elige tu plan de suscripción</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae eos ducimus quidem, deserunt, beatae ut ipsam tenetur optio id corporis illum reprehenderit unde sapiente quibusdam, iste autem blanditiis sequi totam.</p>
        <SwitcherButton labels={['Pago Anual','Pago mensual']} subscriptionType={selectSubscriptionPlan}/>
      </header>
      <table>
        <thead>
          <tr >
            <td></td>
            <td>&nbsp;Basic</td>
            <td>&nbsp;Plus</td>
            <td>Premium</td>
          </tr>
        </thead>
        <tbody>
          <tr className="prices" >
            <td></td>
            <td className="prices_basic" >

              <p className="yearly price flex-container justify-center"><span className={style.price_qty}>200 €</span> / año</p>
            </td>
            <td className="prices_plus" >
              <p className="yearly price flex-container justify-center"><span className={style.price_qty}>300 €</span> / año</p>
            </td>
            <td className="prices_premium" >

              <p className="yearly price flex-container justify-center"><span className={style.price_qty}>500 €</span> / año</p>
            </td>
          </tr>
          <tr >
            <td></td>
            <td>
            <LinkApp target={'_self'} label={'Elegir plan'} linkStyle={'button'} linkHref={`subscription?payment-type=${paymentType}`} />
            </td>
            <td>
            <LinkApp target={'_self'} label={'Elegir plan'} linkStyle={'button'} linkHref={`subscription?payment-type=${paymentType}`} />
            </td>
            <td>
            <LinkApp target={'_self'} label={'Elegir plan'} linkStyle={'button'} linkHref={`subscription?payment-type=${paymentType}`} />
            </td>
          </tr>
          <tr className={style.subheader}>
            <td>&nbsp;Seguimiento del mercado</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr >
            <td>&nbsp;Noticias importantes</td>
            <td><Image src={checkImg} alt='' />
            </td>
            <td><Image src={checkImg} alt='' />
            </td>
            <td><Image src={checkImg} alt='' />
            </td>
          </tr>
          <tr >
            <td>&nbsp;Análisis técnico semanal de Bitcoins</td>
            <td><Image src={checkImg} alt='' />
            </td>
            <td><Image src={checkImg} alt='' />
            </td>
            <td><Image src={checkImg} alt='' />
            </td>
          </tr>
          <tr >
            <td>&nbsp;Análisis técnico semanal de Altcoins</td>
            <td><Image src={checkImg} alt='' />
            </td>
            <td><Image src={checkImg} alt='' />
            </td>
            <td><Image src={checkImg} alt='' />
            </td>
          </tr>
          <tr >
            <td>&nbsp;Flash Updates</td>
            <td><Image src={checkImg} alt='' />
            </td>
            <td><Image src={checkImg} alt='' />
            </td>
            <td><Image src={checkImg} alt='' />
            </td>
          </tr>
          <tr >
            <td>&nbsp;Ideas de inversión de proyectos</td>
            <td><Image src={nocheckImg} alt='' />
            </td>
            <td><Image src={checkImg} alt='' />
            </td>
            <td><Image src={checkImg} alt='' />
            </td>
          </tr>
          <tr >
            <td>&nbsp;Estrategias de inversión y gestión del riesgo</td>
            <td><Image src={nocheckImg} alt='' />
            </td>
            <td><Image src={checkImg} alt='' />
            </td>
            <td><Image src={checkImg} alt='' />
            </td>
          </tr>
          <tr >
            <td>&nbsp;Acceso al portfolio de pAstore capital</td>
            <td><Image src={nocheckImg} alt='' />
            </td>
            <td><Image src={checkImg} alt='' />
            </td>
            <td><Image src={checkImg} alt='' />
            </td>
          </tr>
          <tr className={style.subheader} >
            <td>&nbsp;Legal</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr >
            <td>&nbsp;Acceso a artículos</td>
            <td><Image src={nocheckImg} alt='' />
            </td>
            <td><Image src={checkImg} alt='' />
            </td>
            <td><Image src={checkImg} alt='' />
            </td>
          </tr>
          <tr >
            <td>Acceso a vídeos</td>
            <td><Image src={nocheckImg} alt='' />
            </td>
            <td><Image src={checkImg} alt='' />
            </td>
            <td><Image src={checkImg} alt='' />
            </td>
          </tr>
          <tr >
            <td>&nbsp;Análisis técnico semanal del Altcoins</td>
            <td><Image src={nocheckImg} alt='' />
            </td>
            <td><Image src={nocheckImg} alt='' />
            </td>
            <td><Image src={checkImg} alt='' />
            </td>
          </tr>
          <tr className={style.subheader} >
            <td>&nbsp;La Academia</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>&nbsp;Crypto-Tutoriales</td>
            <td><Image src={nocheckImg} alt='' />
            </td>
            <td><Image src={checkImg} alt='' />
            </td>
            <td><Image src={checkImg} alt='' />
            </td>
          </tr>
          <tr >
            <td>&nbsp;Acceso a todos nuestros cursos</td>
            <td><Image src={nocheckImg} alt='' />
            </td>
            <td><Image src={nocheckImg} alt='' />
            </td>
            <td><Image src={checkImg} alt='' />
            </td>
          </tr>
          <tr >
            <td>&nbsp;Preguntas y respuestas con nuestros profesores</td>
            <td><Image src={nocheckImg} alt='' />
            </td>
            <td><Image src={nocheckImg} alt='' />
            </td>
            <td><Image src={checkImg} alt='' />
            </td>
          </tr>
          <tr className={style.subheader} >
            <td>&nbsp;Comunidad y Eventos</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr >
            <td>Acceso a la comunidad de Discord</td>
            <td><Image src={checkImg} alt='' />
            </td>
            <td><Image src={checkImg} alt='' />
            </td>
            <td><Image src={checkImg} alt='' />
            </td>
          </tr>
          <tr >
            <td>Webinarios / Reuniones</td>
            <td><Image src={nocheckImg} alt='' />
            </td>
            <td><Image src={checkImg} alt='' />
            </td>
            <td><Image src={checkImg} alt='' />
            </td>
          </tr>
          <tr >
            <td>Contenido grabado</td>
            <td><Image src={nocheckImg} alt='' />
            </td>
            <td><Image src={checkImg} alt='' />
            </td>
            <td><Image src={checkImg} alt='' />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default SubscriptionPlans;

