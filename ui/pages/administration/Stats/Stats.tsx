import React from 'react'
import ConsultantsStats from './Consultants'
import UsersStats from './UsersStats'
import style from './stats.module.scss'

const Stats = () => {
  return (
    <div className={style.stats}>
      <div className={style.maxContent}>
        <h1 className='main-title'>Estadisticas generales de Pastore Capital</h1>
        <small>
        Para un detalle completo de estadisticas de pago, recurrencias, etc.
        <a
          style={{ color: 'blue' }}
          href={'https://dashboard.stripe.com/test/billing'}
          target={'_blank'}
          rel='noreferrer'
        >
          Ir a STRIPE
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