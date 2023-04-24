import style from './subscriptionPlans.module.scss'
import Image from 'next/image'
import checkImg from '../../../assets/img/check.svg'
import nocheckImg from '../../../assets/img/nocheck.svg'
import updateSubscription from '../../../assets/img/update-subscription.png'
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
import { FormattedMessage, useIntl } from 'react-intl'

const SubscriptionPlans = () => {
  const [paymentType, setPaymentType] = useState<'month' | 'year'>('month')
  const [plans, setPlans] = useState<PLANS | undefined>()
  const [updatePlan, setupdatePlan] = useState<any>()
  const [loadingupdatePlan, setloadingupdatePlan] = useState<boolean>(false)
  const intl = useIntl()
  const { pushInfoApp } = useSystem()
  const userLoggued = useSelector(getUserLogged)
  const plan = userLoggued?.subscription.plan
  const { replace, push, asPath } = useRouter()
  useEffect(() => {
    systemRepository.getPlans().then(res => {
      setPlans(res)
    })
  }, [])

  useEffect(() => {
    if (userLoggued?.role.level > 1) replace('/');
  }, [userLoggued])


  const update = () => {
    setloadingupdatePlan(true)
    systemRepository.updatePlansSubscription({
      plan_name: updatePlan.subscription.label,
      interval: paymentType,
      sub_id: userLoggued?.subscription.stripe_sub_id as string,
      uid: userLoggued.uid
    })
      .then(() => setupdatePlan(undefined))
      .then(() => {
        setloadingupdatePlan(false)

        pushInfoApp(new InfoApp({ code: 'plan.update', message: 'plan.update' }, 'success'))
      })

  }
  const renderUpdatePlan = () => (<AlertApp
    onAction={() => update()}
    onCancel={() => setupdatePlan(undefined)}
    title={intl.formatMessage({id:'update_plan'})}
    visible={updatePlan != undefined}
  >
    <div className={style.modalContainer}>
      {loadingupdatePlan && <Loading loading={true} variant='inner-primary' />}
      <div className={style.modalContainer_image}>
        <Image src={updateSubscription} alt='Hombre levantando el dedo en señal de OK' />
      </div>
      <div className={style.modalContainer_text}>
        <p>
          <FormattedMessage id='subscription.user.alert.updateSubscription.text' />
          {' '}<strong>{updatePlan?.subscription.label}</strong>?
        </p>
        <p>
          <FormattedMessage id={'page.subscription.payment.adviceModal'} />
        </p>
      </div>
    </div>
  </AlertApp>)

  if (!plans) return <Loading loading={true} />
  else
    return (
      <div className={style.subscriptionPlansPage}>
        <header>
          <p className='small-caps'><FormattedMessage id='subscription'/></p>
          <p className={`${style.topTitle} main-title`}>
          <FormattedMessage id='sub_select_plan'/>
          </p>
          <p>
          <FormattedMessage id='sub_text_intro'/>
          </p>
          <p className={style.paymentType_label}><FormattedMessage id='sub_pay_type'/></p>
          <SwitcherButton
            labels={[intl.formatMessage({id:'price.year'}),intl.formatMessage({id:'price.month'}) ]}
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
                          labelID='update'
                        />
                      )}
                    </div>
                  ) : (
                    <span className={style.myPlan}>
                      <FormattedMessage id={'btn.myPlan'} />
                    </span>
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
                          labelID='update'
                        />
                      )}
                    </div>
                  ) : (
                    <span className={style.myPlan}>
                      <FormattedMessage id={'btn.myPlan'} />
                    </span>)}
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
                          labelID='update'
                        />
                      )}
                    </div>
                  ) : (
                    <span className={style.myPlan}>
                      <FormattedMessage id={'btn.myPlan'} />
                    </span>)}
                </td>
              </tr>
              <tr className={style.subheader}>
                <td>&nbsp;<FormattedMessage id={'table.sub.b1'} /></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>&nbsp;<FormattedMessage id={'table.sub.b2'} /></td>
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
                <td>&nbsp;<FormattedMessage id={'table.sub.b3'} /></td>
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
                <td>&nbsp;<FormattedMessage id={'table.sub.b4'} /></td>
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
                <td>&nbsp;<FormattedMessage id={'table.sub.b5'}/></td>
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
                <td>&nbsp;<FormattedMessage id={'table.sub.b6'}/></td>
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
                <td>&nbsp;<FormattedMessage id={'table.sub.b7'}/></td>
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
                <td>&nbsp;<FormattedMessage id={'table.sub.b8'}/></td>
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
                <td>&nbsp;<FormattedMessage id={'table.sub.b9'}/></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>&nbsp;<FormattedMessage id={'table.sub.b10'}/></td>
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
                <td><FormattedMessage id={'table.sub.b11'}/></td>
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
                <td>&nbsp;<FormattedMessage id={'table.sub.b12'}/></td>
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
                <td>&nbsp;<FormattedMessage id={'table.sub.b13'}/></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>&nbsp;<FormattedMessage id={'table.sub.b14'}/></td>
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
                <td>&nbsp;<FormattedMessage id={'table.sub.b15'}/></td>
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
                <td>&nbsp;<FormattedMessage id={'table.sub.b16'}/></td>
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
                <td>&nbsp;<FormattedMessage id={'table.sub.b17'}/></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td><FormattedMessage id={'table.sub.b18'}/></td>
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
                <td><FormattedMessage id={'table.sub.b19'}/></td>
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
                <td><FormattedMessage id={'table.sub.b20'}/></td>
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
