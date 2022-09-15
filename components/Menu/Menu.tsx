import LinkApp from "components/LinkApp"
import MenuItem from "./components"

interface MENUPROPS {
  itemList?: Array<any>
}

let items = [
  {
    label:'Academia',
    icon:'',
    children: ['Cursos','Cryptotutoriales']
  },
  {
    label:'Análisis',
    icon:'',
    children: ['Bitcoins','Altcoins','Flash updates']
  }
]

export const Menu = ({ itemList }: MENUPROPS) => {
  return (
    <ul>
      {items.map((item, index) =>
        <MenuItem key={index}>
          <LinkApp />
        </MenuItem>
      )}
    </ul>
  )
}
