
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { randomIntFromInterval } from 'ui/utils/component.utils';
import style from './avatar.module.scss'


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
  },
]


const Avatar = ({ renderItem }: { renderItem: any }) => {
  const randomColor = useRef(colorPalette[randomIntFromInterval(0, 6)]);
  
  return (
    <div className={style.avatarContainer} style={{ backgroundColor: randomColor.current.base }}>
      <div className={style.letter} style={{ color: randomColor.current.main }}>{renderItem.toUpperCase()}</div>
    </div>
  )
}

export default React.memo(Avatar) 

