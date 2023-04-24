import React from 'react'
import ConsultantsStats from './Consultants'
import UsersStats from './UsersStats'
import style from './stats.module.scss'
import { FormattedMessage } from 'react-intl'

const Stats = () => {
  return (
    <div className={style.stats}>
      <div className={style.maxContent}>
        <h1 className='main-title'><FormattedMessage id='stats.title'/></h1>
        <small>
        <FormattedMessage id='go_stripe'/>
        <br />
        <a
          style={{ color: 'blue' }}
          href={'https://dashboard.stripe.com/test/billing'}
          target={'_blank'}
          rel='noreferrer'
        >
          STRIPE
        </a>{' '}
      </small>
        <div>
          <UsersStats />
        </div>
        <div>
          <ConsultantsStats />
        </div>
      </div>
    </div>
  )
}

export default Stats