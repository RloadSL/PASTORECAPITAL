import Chip from "./components/Chip";

export interface CHIPLISTPROPS {
  chipList: Array<any>
}

/**
 * Función del componente ChipList
 * @param chipList Array de Chips que renderizará el componente
 * @returns 
 */

const ChipList = ({ chipList }: CHIPLISTPROPS) => {
  return (
    <div>
      {chipList.map((item: any, index: any) => <Chip key={index} chip={item}/>)}
    </div>

  )
}

export default ChipList;