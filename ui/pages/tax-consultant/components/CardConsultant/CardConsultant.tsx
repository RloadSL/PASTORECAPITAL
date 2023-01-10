import style from './cardConsultant.module.scss'
import { Avatar } from 'domain/Interfaces/Avatar'
import { Country } from '../../../../../domain/Interfaces/Country'
import Image from 'next/image'
import Link from 'next/link'
import Card from 'components/Card'
import UserImage from 'components/UserImage'
import Chips from 'components/Chips'
import ConsultantShortDetails from '../ConsultantShortDetails'
import { UserConsultant } from 'domain/UserConsultant/UserConsultant'

//@jose estas mezclando interfaces con otra forma de tipado, si hemos hecho los componentes complejos con interfaces lo suyo es seguir así no?, aquí ya lo he arreglado
interface cardConsultantProps {
  consultant: UserConsultant
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
  consultant
}: cardConsultantProps) => {
  
  return (
    <div className={style.cardConsultantItem}>
      <Link href={`/tax-consultant/consultants/${consultant.id}`}>
        <a>
          <Card cardStyle={'modal'}>
            <ConsultantShortDetails  country={consultant.country} name={consultant.name} lastname={consultant.lastname} avatar={consultant.avatar} keywords={consultant.keywords} state={consultant.state} />
          </Card>
        </a>
      </Link>
    </div>
  )
}

export default CardConsultant
