



import axios from 'axios';
import parse from 'html-react-parser';
import style from './CourseDetail.module.scss';
import { WP_EDIT_POST } from 'infrastructure/wordpress/config';
import { NextPage } from 'next';
import { Course } from 'domain/Course/Course';
import { useSelector } from 'react-redux';
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors';

const CourseDetail:NextPage<any> = ({post}:{post:Course}) => {
  const loggedUser = useSelector(getUserLogged);
  
  const editLink = (token:string) => {
    return `${WP_EDIT_POST}?post=${post.id}&action=edit&?&token=${token}`;
  }
  return (
    <div className={style.coursePage}>
      <div>
        {(post && loggedUser?.wpToken) ? <a href={editLink(loggedUser.wpToken)} target="_blank" rel="noreferrer"> EDITAR </a> : null}
        <div className={style.post}>{parse(post.content?.rendered || '')}</div>
      </div>
    </div>
  );
}
///<div className={styles.post}>{parse(content)}</div>


export default CourseDetail;