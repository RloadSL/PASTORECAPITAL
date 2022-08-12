import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

interface LangProps {lang:'es' | 'en'}
/**
 * Componente manejador del swipper de idioma 
 */
export default function Lang (props : LangProps ) {
  const locales = useRouter().locales || []
  return (
    <div className='language-selector-container'>
      {[...locales].sort().map(locale => (
        <Link key={locale} href='/' locale={locale}>
          {locale}
        </Link>
      ))}
    </div>
  )
}
