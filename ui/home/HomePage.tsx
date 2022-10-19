import Form from "components/FormApp";
import { NextPage } from "next";
import styles from './HomePage.module.scss'


const HomePage:NextPage = () => {
  return (<>
    <div className="working-on">Estamos trabajando en esta sección.</div>
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