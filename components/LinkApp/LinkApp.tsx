import Link from "next/link"
import Image from 'next/image'
import style from './LinkApp.module.scss'
import { FormattedMessage } from "react-intl"

interface LINKAPPPROPS {
  label?: string,
  icon?: string
  linkHref?: string
}

export const LinkApp = ({ label, icon, linkHref }: LINKAPPPROPS) => {
  return (
    <Link href={linkHref ? linkHref : '#'}>
      <a className={style.linkItem}>
        {icon ? <span className={style.linkItemIcon}><Image src={icon} alt='' /></span> : null}
        <span className={style.linkItemLabel}>
          <FormattedMessage id={label} />
        </span>
      </a>
    </Link>
  )
}

