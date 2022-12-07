import style from './switcherButton.module.scss';
import React, {
  useEffect,
  useState,
  useRef,
  useCallback
} from 'react'
import { useRouter } from 'next/router';

interface SwitcherButtonProps {
  labels: Array<string>
  subscriptionType: any
}

const SwitcherButton = ({ labels, subscriptionType = 'monthly' }: SwitcherButtonProps) => {
  return <SwitcherButtonView subscriptionType={subscriptionType} labels={labels}></SwitcherButtonView>
}

const SwitcherButtonView = ({ labels, subscriptionType }: SwitcherButtonProps) => {
  const router = useRouter();

  const handleSubscriptionType = (e:any) => {
    //console.log(e.currentTarget.id)
    const elTarget = e.currentTarget.id;
    const circle = document.querySelector('#circle') as HTMLElement;
    if(elTarget === 'monthly') {
      circle.style.left = '45px';
      subscriptionType(elTarget)
      // console.log(router)
      // router.query = {paco:'paco'}
    } else {
      circle.style.left = '0px';
      subscriptionType(elTarget);
    }
  }

  return (
    <div>
      <div className={style.billedButtons}>
        <label id={'yearly'} className={style.labelYearly} onClick={handleSubscriptionType}>
          <input className="billed-buttons_button" type="radio" name="suscription" value="yearly" id="first" />
          {labels[0]}
        </label>
        <div className={style.radioButton}>
          <span id="circle" className={style.circle} style={{ left: "0px" }}></span>
        </div>
        <label className={style.labelMonthly} id={'monthly'} onClick={handleSubscriptionType}>
          <input className="billed-buttons_button" type="radio" name="suscription" value="monthly" id="second" />
          {labels[1]}
        </label>
      </div>
    </div>
  )
}

export default SwitcherButton;