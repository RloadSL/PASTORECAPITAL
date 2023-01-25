/* eslint-disable react-hooks/exhaustive-deps */
import style from './switcherButton.module.scss'
import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useRouter } from 'next/router'

interface SwitcherButtonProps {
  labels: Array<string>
  onChange: Function
}

const SwitcherButton = ({ onChange, labels }: SwitcherButtonProps) => {
  const [subscriptionType, setSubscriptionType] = useState('rigth')

  const handleSubscriptionType = (type: 'left' | 'rigth') => {
    setSubscriptionType(type)
    onChange(type)
  }

  return (
    <div>
      <div className={style.billedButtons}>
        <label
          id={'yearly'}
          className={style.labelYearly}
          onClick={() => handleSubscriptionType('left')}
        >
          <input
            className='billed-buttons_button'
            type='radio'
            name='suscription'
            value='yearly'
            id='first'
          />
          {labels[0]}
        </label>
        <div className={style.radioButton}>
          <span
            id='circle'
            className={style.circle}
            style={{ left: subscriptionType === 'left' ? '0px' : '45px' }}
          ></span>
        </div>
        <label
          className={style.labelMonthly}
          id={'monthly'}
          onClick={() => handleSubscriptionType('rigth')}
        >
          <input
            className='billed-buttons_button'
            type='radio'
            name='suscription'
            value='monthly'
            id='second'
          />
          {labels[1]}
        </label>
      </div>
    </div>
  )
}

export default SwitcherButton
