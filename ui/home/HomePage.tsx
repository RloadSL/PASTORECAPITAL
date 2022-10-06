import Form from "components/FormApp";
import { NextPage } from "next";
import styles from './HomePage.module.scss'


const HomePage:NextPage = () => {
  return (<>
    <video width="400" controls>
        <source src="https://firebasestorage.googleapis.com/v0/b/pastore-capital.appspot.com/o/_import_60f1222ff0cb64.70258175.mov?alt=media" />
    </video>
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