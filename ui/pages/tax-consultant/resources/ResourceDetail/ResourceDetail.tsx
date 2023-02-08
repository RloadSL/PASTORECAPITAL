import style from './resourceDetail.module.scss'
import { PostDto } from 'infrastructure/dto/post.dto'
import { WP_EDIT_POST } from 'infrastructure/wordpress/config'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import parse from 'html-react-parser'
import ReadingProgressBar from 'components/ReadingProgressBar'
import ButtonApp from 'components/ButtonApp'
import LinkApp from 'components/LinkApp'
import iconEdit from '../../../../../assets/img/icons/pencil.svg'
import iconDelete from '../../../../../assets/img/icons/trash.svg'
import WordpressHeader from 'WordpressHeader'
import { FormattedMessage } from 'react-intl'
import DeleteResource from '../components/DeleteResource/DeleteResource'


const ResourceDetail: NextPage<any> = ({ post }: { post: PostDto }) => {
  const router = useRouter()
  const loggedUser = useSelector(getUserLogged)

  useEffect(() => {
    if (!post) {
      router.replace('/tax-consultant/resources')
    }
  }, [post])

  const editLink = (token?: string) => {
    return token ? `${WP_EDIT_POST}?post=${post.id}&action=edit&?&token=${token}` : undefined;
  }

  return post ? <ResourceDetailView
    resourceTitle={router.query.resourceTitle as string}
    ispublisherized={loggedUser?.wpToken != null}
    post={post}
    editLink={editLink(loggedUser?.wpToken)}
  /> : <></>
}

const ResourceDetailView = ({
  post,
  resourceTitle,
  ispublisherized,
  editLink,

}: {
  post: any
  ispublisherized: boolean
  editLink?: string,
  resourceTitle: string

}) => {
  const contentRef = useRef<any>();
  const [deleteResource, setDeleteResource]: [{ id: number, status: string } | null, Function] = useState(null)

  return (
    <div className={style.resourcePage} ref={contentRef}>
     <WordpressHeader/>
      <ReadingProgressBar target={contentRef} />
      <div className={style.readingContainer}>
        {post && editLink ? (
          <div className='admin-buttons-wrapper'>
            <div className='admin-buttons-container'>
              <LinkApp label={'edit'} linkStyle={'edit'} linkHref={editLink} icon={iconEdit} />
              <ButtonApp labelID={'btn.delete'} onClick={() => setDeleteResource({ id: post.id, status: post.status })} type='button' buttonStyle='delete' size='small' icon={iconDelete} />
            </div>
          </div>
        ) : null}
        <div>
          <p className='small-caps'>{resourceTitle}
            <FormattedMessage id={'resources'}/>
          </p>
          <h1 className='main-title'>{post.title.rendered}</h1>
        </div>
        <div className={style.post}>{parse(post.content?.rendered || '')}</div>
      </div>
      {deleteResource && (
        <Suspense>
          <DeleteResource data={deleteResource} onClose={() => setDeleteResource(null)} />
        </Suspense>
      )}
    </div>
  )
}

export default ResourceDetail;