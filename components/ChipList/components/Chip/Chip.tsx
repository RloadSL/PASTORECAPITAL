
interface CHIPPROPS {
  chip: string
}

/**
 * Función del componente Chip
 * @param chip Chip que se va a renderizar
 * @returns 
 */

const Chip = ({chip}:CHIPPROPS) => {
  return (
    <div>
      <span>{chip}</span>
    </div>
  )
}

export default Chip