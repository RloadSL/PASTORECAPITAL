import Link from "next/link"
import Image from 'next/image'
import style from './LinkApp.module.scss'
import { FormattedMessage } from "react-intl"

interface LINKAPPPROPS {
  label?: string,
  icon?: string
  linkHref?: string
  target?: '_blank' | '_self' | '_parent' | '_top'
  linkStyle?: 'default' | 'edit' | 'button' | 'vertical'
}

export const LinkApp = ({ label, icon, linkHref, target = '_blank', linkStyle = 'default' }: LINKAPPPROPS) => {
  return (
    <Link href={linkHref ? linkHref : '#'}>
      <a onClick={() => document.body.style.overflow = 'auto'} className={`${style.linkItem} ${style[linkStyle]}`} target={target} >
        {icon ? <span className={style.linkItemIcon}><Image src={icon} alt='' /></span> : null}
        {label ? (
          <span className={style.linkItemLabel}>
          <FormattedMessage id={label} />
        </span>
        ) : ''}
      </a>
    </Link>
  )
}

