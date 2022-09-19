import PostGrid from "components/PostGrid"
import style from './Courses.module.scss'
import img from '../../../../../assets/img/couple.jpg'


const gridItems = [
  {
    title: 'Invierte en Bitcoins',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    thumbnail: {
      imgUrl: img,
      altText: 'Pareja chocando los cinco'
    },
    postLink: '',
    id: '',
    chips: ['2 horas', 'trading']
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
    chips: ['2 horas', 'trading']
  },
  {
    title: 'Ethereum entender el qué y el cómo',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    thumbnail: {
      imgUrl: img,
      altText: 'Pareja chocando los cinco'
    },
    postLink: '',
    id: '',
    chips: ['2 horas', 'trading']
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
    chips: ['2 horas', 'trading']
  }
]

const Courses = () => {
  return (
    <div>
      <div className="title-container">
        <p className="small-caps">Academia</p>
        <h1>Cursos</h1>
      </div>
      <PostGrid gridItems={gridItems} />
    </div>
  )
}

export default Courses