import { NextPage } from "next";
import styles from './Home.module.scss'
 const HomePage: NextPage = ()=>{
  return (<h1 className={styles['title']}>Home Page</h1>)
}

export  const getStaticProps = async () => {
  return {
    props: {
      userName: "Jose",
    },
  }
}

export default HomePage