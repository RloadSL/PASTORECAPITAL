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
      <a>
        <FormattedMessage id={label}/>
        {icon ? <Image src={icon} alt=''/> : null}
      </a>
    </Link>
  )
}

