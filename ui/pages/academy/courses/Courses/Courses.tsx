import PostGrid from "components/PostGrid"
import style from './Courses.module.scss'
import img from '../../../../../assets/img/couple.jpg'
import FormApp from "components/FormApp"
import SelectApp from "components/FormApp/components/SelectApp/SelectApp"



const gridItems = [
  {
    title: 'Invierte en Bitcoins. El mejor momento',
    description: 'Lor',
    thumbnail: {
      imgUrl: img,
      altText: 'Pareja chocando los cinco'
    },
    postLink: '',
    id: '',
    terms: ['2 horas', 'trading'],
    level: ['básico']
  },
  {
    title: 'Trading extremo',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    thumbnail: {
      imgUrl: img,
      altText: 'Pareja chocando los cinco'
    },
    postLink: '',
    id: '',
    terms: ['2 horas', 'trading'],
    level: ['avanzado']
  },
  {
    title: 'Ethereum entender el qué y el cómo. Un viaje a las criptomonedas',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    thumbnail: {
      imgUrl: img,
      altText: 'Pareja chocando los cinco'
    },
    postLink: '',
    id: '',
    terms: ['2 horas', 'trading'],
    level: ['intermedio']
  },
  {
    title: 'Curso avanzado de Trading',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    thumbnail: {
      imgUrl: img,
      altText: 'Pareja chocando los cinco'
    },
    postLink: '',
    id: '',
    terms: ['2 horas', 'trading'],
    level: ['intermedio']
  }
]

const options = [
  { value: 'trading', label: 'Trading' },
  { value: 'criptomonedas', label: 'Criptomonedas' },
  { value: 'todos', label: 'Todos' }
]

/**
 * Función principal del componente Courses
 * @returns
 */

const Courses = () => {

  return (
    <div className={style.coursesPage}>
      <div><form>
        <SelectApp labelID={'categoría'} selectOptions={options} />
      </form></div>
      <div className="title-container">
        <p className="small-caps">Academia</p>
        <h1>Cursos</h1>
      </div>
      <PostGrid gridItems={gridItems} />
    </div>
  )
}

export default Courses