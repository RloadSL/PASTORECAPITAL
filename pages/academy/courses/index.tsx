import dynamic from 'next/dynamic'

const Courses = dynamic(() =>
  import('ui/pages/academy/courses/Courses/Courses').then(mod => mod.default)
)

export default Courses
