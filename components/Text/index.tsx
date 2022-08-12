import Link from 'next/link'
import { FormattedMessage } from 'react-intl'
import styles from './Text.module.scss'

/**
 * Componente de texto y traducciones
 * @param param0
 * @returns
 */
export default function Text ({
  id,
  type
}: {
  id: string
  type?: 'p' | 'h1' | 'h2' | 'h3' | 'span' | 'strong'
}) {
  switch (type) {
    case 'p':
      return (
        <p className={styles.p}>
          <FormattedMessage id={id} />
        </p>
      )
    case 'h1':
      return (
        <h1 className={styles.h1}>
         
          <FormattedMessage id={id} />
        </h1>
      )
    case 'h2':
      return (
        <h2 className={styles.h2}>
          <FormattedMessage id={id} />
        </h2>
      )
    case 'h3':
      return (
        <h3 className={styles.h3}>
          <FormattedMessage id={id} />
        </h3>
      )
    case 'span':
      return (
        <span className={styles.span}>
          <FormattedMessage id={id} />
        </span>
      )
    case 'strong':
      return (
        <strong className={styles.strong}>
          <FormattedMessage id={id} />
        </strong>
      )

    default:
      return <FormattedMessage id={id} />
  }
}
