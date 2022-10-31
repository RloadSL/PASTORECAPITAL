import { useEffect, useState } from 'react';
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
  const [randomColorScheme,setRandomColorScheme] = useState(colorPalette[0])

  //lo meto dentro de useEffect para que no se genere un color cada vez que redimensiono
  useEffect(() => {
    setRandomColorScheme(colorPalette[Math.floor(Math.random() * colorPalette.length)])
  }, [randomColorScheme]);

  return (
    <div className={style.avatarContainer} style={{ backgroundColor: randomColorScheme.base }}>
      <div className={style.letter} style={{ color: randomColorScheme.main }}>{renderItem}</div>
    </div>
  )
}

export default Avatar

