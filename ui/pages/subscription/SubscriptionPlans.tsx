import style from './subscriptionPlans.module.scss'
import Image from 'next/image'
import checkImg from '../../../assets/img/check.svg'
import nocheckImg from '../../../assets/img/nocheck.svg'
import SwitcherButton from 'components/SwitcherButton'
import LinkApp from 'components/LinkApp'
import { useEffect, useState } from 'react'
import { PLANS } from 'infrastructure/dto/system_config.dto'
import systemRepository from 'infrastructure/repositories/system.repository'
import Loading from 'components/Loading'
import { useSelector } from 'react-redux'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import AlertApp from 'components/AlertApp'
import ButtonApp from 'components/ButtonApp'
import { useSystem } from 'ui/hooks/system.hooks'
import { InfoApp } from 'domain/InfoApp/InfoApp'
import { useRouter } from 'next/router'

const SubscriptionPlans = () => {
  const [paymentType, setPaymentType] = useState<'month' | 'year'>('month')
  const [plans, setPlans] = useState<PLANS | undefined>()
  const [updatePlan, setupdatePlan] = useState<any>()
  const {pushInfoApp} = useSystem()
  const userLoggued = useSelector(getUserLogged)
  const plan = userLoggued?.subscription.plan
  const {reload} = useRouter()
  useEffect(() => {
    systemRepository.getPlans().then(res => {
      setPlans(res)
    })
  }, [])

  const update = ()=>{
     systemRepository.updatePlansSubscription({
      plan_name: updatePlan.subscription.label,
      interval: paymentType,
      sub_id: userLoggued?.subscription.stripe_sub_id as string,
      uid: userLoggued.uid
     })
     .then(()=>setupdatePlan(undefined))
     .then(()=>{
        pushInfoApp(new InfoApp({code: 'plan.update', message: 'plan.update'}, 'success'))
     })
     .then(()=>reload())
  }
  const renderUpdatePlan = () => (<AlertApp
    onAction={() => update()}
    onCancel={() => setupdatePlan(undefined)}
    title='Actualizar plan'
    visible={updatePlan != undefined}
  >
    <div>
      Quieres actualizar tu actual subscription a{' '}
      {updatePlan?.subscription.label}
    </div>
  </AlertApp>)

  if (!plans) return <Loading loading={true} />
  else
    return (
      <div className={style.subscriptionPlansPage}>
        <header>
          <p className='small-caps'>Suscripción</p>
          <p className={`${style.topTitle} main-title`}>
            Elige tu plan de suscripción
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
            eos ducimus quidem, deserunt, beatae ut ipsam tenetur optio id
            corporis illum reprehenderit unde sapiente quibusdam, iste autem
            blanditiis sequi totam.
          </p>
          <p className={style.paymentType_label}>Selecciona el tipo de pago</p>
          <SwitcherButton
            labels={['Pago Anual', 'Pago mensual']}
            onChange={(p: 'left' | 'rigth') =>
              setPaymentType(p === 'left' ? 'year' : 'month')
            }
          />
        </header>
        <div className={style.tableContainer}>
          <table>
            <thead>
              <tr>
                <td></td>
                <td>&nbsp;Basic</td>
                <td>&nbsp;Plus</td>
                <td>Premium</td>
              </tr>
            </thead>
            <tbody>
              <tr className='prices'>
                <td></td>
                <td className='prices_basic'>
                  <p className='yearly price flex-container justify-center'>
                    <span className={style.price_qty}>
                      {plans.basic.price[paymentType]} €
                    </span>{' '}
                    / año
                  </p>
                </td>
                <td className='prices_plus'>
                  <p className='yearly price flex-container justify-center'>
                    <span className={style.price_qty}>
                      {plans.plus.price[paymentType]} €
                    </span>{' '}
                    / año
                  </p>
                </td>
                <td className='prices_premium'>
                  <p className='yearly price flex-container justify-center'>
                    <span className={style.price_qty}>
                      {plans.premium.price[paymentType]} €
                    </span>{' '}
                    / año
                  </p>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  {plan?.key != 'basic' ? (
                    <div className={style.buttonContainer}>
                      {plan?.key === 'guest' ? (
                        <LinkApp
                          target={'_self'}
                          label={'Elegir plan'}
                          linkStyle={'button'}
                          linkHref={`subscription/basic?payment_type=${paymentType}`}
                        />
                      ) : (
                        <ButtonApp
                          onClick={() => setupdatePlan(plans.basic)}
                          labelID='Actualizar'
                        />
                      )}
                    </div>
                  ) : (
                    <span> Subscrito </span>
                  )}
                </td>
                <td>
                  {plan?.key != 'plus' ? (
                    <div className={style.buttonContainer}>
                      {plan?.key === 'guest' ? (
                        <LinkApp
                          target={'_self'}
                          label={'Elegir plan'}
                          linkStyle={'button'}
                          linkHref={`subscription/plus?payment_type=${paymentType}`}
                        />
                      ) : (
                        <ButtonApp
                          onClick={() => setupdatePlan(plans.plus)}
                          labelID='Actualizar'
                        />
                      )}
                    </div>
                  ) : (
                    <span> Subscrito </span>
                  )}
                </td>
                <td>
                  {plan?.key != 'premium' ? (
                    <div className={style.buttonContainer}>
                      {plan?.key === 'guest' ? (
                        <LinkApp
                          target={'_self'}
                          label={'Elegir plan'}
                          linkStyle={'button'}
                          linkHref={`subscription/premium?payment_type=${paymentType}`}
                        />
                      ) : (
                        <ButtonApp
                          onClick={() => setupdatePlan(plans.premium)}
                          labelID='Actualizar'
                        />
                      )}
                    </div>
                  ) : (
                    <span> Subscrito </span>
                  )}
                </td>
              </tr>
              <tr className={style.subheader}>
                <td>&nbsp;Seguimiento del mercado</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>&nbsp;Noticias importantes</td>
                <td>
                  <Image src={checkImg} alt='' />
                </td>
                <td>
                  <Image src={checkImg} alt='' />
                </td>
                <td>
                  <Image src={checkImg} alt='' />
                </td>
              </tr>
              <tr>
                <td>&nbsp;Análisis técnico semanal de Bitcoins</td>
                <td>
                  <Image src={checkImg} alt='' />
                </td>
                <td>
                  <Image src={checkImg} alt='' />
                </td>
                <td>
                  <Image src={checkImg} alt='' />
                </td>
              </tr>
              <tr>
                <td>&nbsp;Análisis técnico semanal de Altcoins</td>
                <td>
                  <Image src={checkImg} alt='' />
                </td>
                <td>
                  <Image src={checkImg} alt='' />
                </td>
                <td>
                  <Image src={checkImg} alt='' />
                </td>
              </tr>
              <tr>
                <td>&nbsp;Flash Updates</td>
                <td>
                  <Image src={checkImg} alt='' />
                </td>
                <td>
                  <Image src={checkImg} alt='' />
                </td>
                <td>
                  <Image src={checkImg} alt='' />
                </td>
              </tr>
              <tr>
                <td>&nbsp;Ideas de inversión de proyectos</td>
                <td>
                  <Image src={nocheckImg} alt='' />
                </td>
                <td>
                  <Image src={checkImg} alt='' />
                </td>
                <td>
                  <Image src={checkImg} alt='' />
                </td>
              </tr>
              <tr>
                <td>&nbsp;Estrategias de inversión y gestión del riesgo</td>
                <td>
                  <Image src={nocheckImg} alt='' />
                </td>
                <td>
                  <Image src={checkImg} alt='' />
                </td>
                <td>
                  <Image src={checkImg} alt='' />
                </td>
              </tr>
              <tr>
                <td>&nbsp;Acceso al portfolio de pAstore capital</td>
                <td>
                  <Image src={nocheckImg} alt='' />
                </td>
                <td>
                  <Image src={checkImg} alt='' />
                </td>
                <td>
                  <Image src={checkImg} alt='' />
                </td>
              </tr>
              <tr className={style.subheader}>
                <td>&nbsp;Legal</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>&nbsp;Acceso a artículos</td>
                <td>
                  <Image src={nocheckImg} alt='' />
                </td>
                <td>
                  <Image src={checkImg} alt='' />
                </td>
                <td>
                  <Image src={checkImg} alt='' />
                </td>
              </tr>
              <tr>
                <td>Acceso a vídeos</td>
                <td>
                  <Image src={nocheckImg} alt='' />
                </td>
                <td>
                  <Image src={checkImg} alt='' />
                </td>
                <td>
                  <Image src={checkImg} alt='' />
                </td>
              </tr>
              <tr>
                <td>&nbsp;Análisis técnico semanal del Altcoins</td>
                <td>
                  <Image src={nocheckImg} alt='' />
                </td>
                <td>
                  <Image src={nocheckImg} alt='' />
                </td>
                <td>
                  <Image src={checkImg} alt='' />
                </td>
              </tr>
              <tr className={style.subheader}>
                <td>&nbsp;La Academia</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>&nbsp;Crypto-Tutoriales</td>
                <td>
                  <Image src={nocheckImg} alt='' />
                </td>
                <td>
                  <Image src={checkImg} alt='' />
                </td>
                <td>
                  <Image src={checkImg} alt='' />
                </td>
              </tr>
              <tr>
                <td>&nbsp;Acceso a todos nuestros cursos</td>
                <td>
                  <Image src={nocheckImg} alt='' />
                </td>
                <td>
                  <Image src={nocheckImg} alt='' />
                </td>
                <td>
                  <Image src={checkImg} alt='' />
                </td>
              </tr>
              <tr>
                <td>&nbsp;Preguntas y respuestas con nuestros profesores</td>
                <td>
                  <Image src={nocheckImg} alt='' />
                </td>
                <td>
                  <Image src={nocheckImg} alt='' />
                </td>
                <td>
                  <Image src={checkImg} alt='' />
                </td>
              </tr>
              <tr className={style.subheader}>
                <td>&nbsp;Comunidad y Eventos</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Acceso a la comunidad de Discord</td>
                <td>
                  <Image src={checkImg} alt='' />
                </td>
                <td>
                  <Image src={checkImg} alt='' />
                </td>
                <td>
                  <Image src={checkImg} alt='' />
                </td>
              </tr>
              <tr>
                <td>Webinarios / Reuniones</td>
                <td>
                  <Image src={nocheckImg} alt='' />
                </td>
                <td>
                  <Image src={checkImg} alt='' />
                </td>
                <td>
                  <Image src={checkImg} alt='' />
                </td>
              </tr>
              <tr>
                <td>Contenido grabado</td>
                <td>
                  <Image src={nocheckImg} alt='' />
                </td>
                <td>
                  <Image src={checkImg} alt='' />
                </td>
                <td>
                  <Image src={checkImg} alt='' />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {renderUpdatePlan()}
      </div>
    )
}

export default SubscriptionPlans
