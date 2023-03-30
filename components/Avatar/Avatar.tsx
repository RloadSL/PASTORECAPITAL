import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  randomIntFromInterval,
  hashIDGenerator
} from 'ui/utils/component.utils'
import style from './avatar.module.scss'
import logo from '../../assets/img/logo-image.svg'
import { useSelector } from 'react-redux'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import Image from 'next/image'

const colorPalette = [
  {
    base: '#5956E9',
    main: '#88f4ff'
  },
  {
    base: '#8b2ae1',
    main: '#f1e6fb'
  },
  {
    base: '#a2e6d1',
    main: '#5956E9'
  },
  {
    base: '#5956E9',
    main: '#a2e6d1'
  },
  {
    base: '#f1e6fb',
    main: '#8b2ae1'
  },
  {
    base: '#88f4ff',
    main: '#5956E9'
  },
  {
    base: '#ffdc60',
    main: '#5956E9'
  }
]

interface AVATARPROPS {
  renderItem: string | null
  size?: 'small' | 'large'
  uid?: string | undefined
  render_logo?: boolean
}

/**
 * Componente para renderizar la primera letra del avatr de un usuario
 * @param renderItem Texto para renderizar
 * @param size Tamaño del avatar 'small' | 'large'
 * @param uid ID de usuario
 * @returns
 */

const Avatar = ({
  render_logo = false,
  renderItem,
  size = 'small',
  uid
}: AVATARPROPS) => {
  const randomColor = useRef(
    uid !== undefined
      ? colorPalette[Math.abs(hashIDGenerator(uid)) % 6]
      : colorPalette[randomIntFromInterval(0, 6)]
  )

  return (
    <div
      className={`${style.avatarContainer} ${style[size]}`}
      style={{ backgroundColor: renderItem ? "#ffff" : randomColor.current.base }}
    >
      {!render_logo ? (
        <div
          className={style.letter}
          style={{ color: randomColor.current.main }}
        >
          {renderItem !== null ? renderItem.toUpperCase() : ''}
        </div>
      ) : (
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            padding: '5px'
          }}
        >
          <Image src={logo} alt='Logo pastore capital'/>
        </div>
      )}
    </div>
  )
}

export default React.memo(Avatar)
