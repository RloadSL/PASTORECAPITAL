import style from './cardConsultant.module.scss'
import { Avatar } from 'domain/Interfaces/Avatar'
import { Country } from '../../../../../domain/Interfaces/Country'
import Image from 'next/image'
import Link from 'next/link'
import Card from 'components/Card'
import UserImage from 'components/UserImage'
import Chips from 'components/Chips'
import ConsultantShortDetails from '../ConsultantShortDetails'

//@jose estas mezclando interfaces con otra forma de tipado, si hemos hecho los componentes complejos con interfaces lo suyo es seguir así no?, aquí ya lo he arreglado
interface cardConsultantProps {
  id: string
  country: Country
  avatar: Avatar
  name: string
  lastname: string
  keywords: Array<{ label: string, icon?: any }>
  state: 'new' | 'active' | 'disabled'
}

/**
 * Componente de card de asesor para el listado de asesores
 * @param id Id del
 * @param country Paìs del asesor
 * @param avatar Imagen del asesor
 * @param name Nombre del asesor
 * @param lastname Apellido del asesor
 * @param keywords Palabras clave para los servicios del asesor
 * @param state Estado del asesor 'new' | 'active' | 'disabled'
 * @returns 
 */


const CardConsultant = ({
  id,
  country,
  name,
  lastname,
  avatar,
  keywords,
  state
}: cardConsultantProps) => {
  const fakeKeywords = [{ label: 'Abogado' }, { label: 'Asesoría Fiscal' }]
  return (
    <div className={style.cardConsultantItem}>
      <Link href={`/tax-consultant/consultants/${id}`}>
        <a>
          <Card cardStyle={'modal'}>
            <ConsultantShortDetails  country={country} name={name} lastname={lastname} avatar={avatar} keywords={fakeKeywords} state={state} />
          </Card>
        </a>
      </Link>
    </div>
  )
}

export default CardConsultant
