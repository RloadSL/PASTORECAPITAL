



import axios from 'axios';
import parse from 'html-react-parser';
import style from './CourseDetail.module.scss';
import { WP_EDIT_POST } from 'infrastructure/wordpress/config';
import { NextPage } from 'next';
import { Course } from 'domain/Course/Course';
import { useSelector } from 'react-redux';
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Custom404 from 'pages/404';

const CourseDetail:NextPage<any> = ({post}:{post:Course}) => {
  const router = useRouter()
  const loggedUser = useSelector(getUserLogged);
  
  useEffect(() => {
    if(!post){
      router.replace('/academy/courses')
    }  
  }, [post])
  
  const editLink = (token:string) => {
    return `${WP_EDIT_POST}?post=${post.id}&action=edit&?&token=${token}`;
  }

  return (
    post ? <div className={style.coursePage}>
      <div>
        {(post && loggedUser?.wpToken) ? <a href={editLink(loggedUser.wpToken)} target="_blank" rel="noreferrer"> EDITAR </a> : null}
        <div className={style.post}>{parse(post.content?.rendered || '')}</div>
      </div>
    </div> : <Custom404></Custom404>
  );
}


export default CourseDetail;