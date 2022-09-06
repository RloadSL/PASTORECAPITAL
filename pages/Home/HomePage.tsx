import Form from "components/FormApp";
import { NextPage } from "next";
import styles from './HomePage.module.scss'


const HomePage:NextPage = () => {
  return (<>
    <h1 id="h1">Home Page</h1>
   
  </>

  )
}

export const getStaticProps = async () => {
  return {
    props: {
      userName: "Jose",
    },
  }
}

export default HomePage