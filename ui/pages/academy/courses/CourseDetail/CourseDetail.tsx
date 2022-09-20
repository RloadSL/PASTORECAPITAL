



import axios from 'axios';
import parse from 'html-react-parser';
import styles from './CourseDetail.module.scss';
import { WP_EDIT_POST } from 'infrastructure/wordpress/config';
import { NextPage } from 'next';
import { Course } from 'domain/Course/Course';
import { useSelector } from 'react-redux';
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors';



const CourseDetail:NextPage<any> = ({post}:{post:Course}) => {
  const loggedUser = useSelector(getUserLogged);
  console.log(post)
  const editLink = (token:string) => {
    return `${WP_EDIT_POST}?post=${post.id}&action=edit&?&token=${token}`;
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <main className="flex flex-col items-center flex-1 mx-5 md:px-20 py-10 max-w-5xl m-auto">
        {(post && loggedUser?.wpToken) ? <a href={editLink(loggedUser.wpToken)} target="_blank" rel="noreferrer"> EDITAR </a> : null}
        <div className={styles.post}>{parse(post.content?.rendered || '')}</div>
      </main>
    </div>
  );
}
///<div className={styles.post}>{parse(content)}</div>


export default CourseDetail;