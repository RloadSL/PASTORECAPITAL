/* eslint-disable react-hooks/exhaustive-deps */
import ButtonApp from 'components/ButtonApp'
import { Comments } from 'domain/Comments/comments'
import { CommentsImplInstance } from 'infrastructure/repositories/comments.repository'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

import style from './CommentsList.module.scss'
import CreateFormComment from './components/CreateFormComment'
import SingleComment from './components/SingleComment'

interface COMMENTSLISTPROPS {
  parent?: { id: string; path: string }
  children?: any
  main?: boolean
  check_answered?:boolean
  newComments?: Comments
  infoData?: {
    mainTitle: string,
    description?: string
  },
  metadata? : {
    /*
    Usuario a notificar comentario nuevo
    */
    notify: string
  }
}

const CommentsListApp = ({ parent, main, newComments, infoData, metadata }: COMMENTSLISTPROPS) => {
  const [commentsList, setcommentsList] = useState<Array<Comments>>([])
  const [lastSnapshot, setlastSnapshot] = useState<any>(null)

  const router = useRouter()
  useEffect(() => {
    let fetching = true
    if(parent?.id)
    getComments().then(res => {
      if (fetching && res.comments) {
        const { comments, lastSnapshot } = res
        if (commentsList.length === 0) {
          setcommentsList(pre => [...comments, ...pre])
          setlastSnapshot(lastSnapshot)
        }
      }
    })
    return () => {
      fetching = false
    }
  }, [parent?.id])

  useEffect(() => {
    if (newComments) {
      setcommentsList(pre => [newComments, ...pre])
    }
  }, [newComments])

  const getComments = async () => {
    const response = await CommentsImplInstance.getComments(
      { id: parent?.id || (router.query.lesson_id as string) },
      lastSnapshot
    )
    return response
  }

  const _loadMore = () => {
    getComments().then(res => {
      const { comments, lastSnapshot } = res
      setcommentsList(pre => [...pre, ...comments])
      if (comments.length < 5) {
        setlastSnapshot(null)
      } else {
        setlastSnapshot(lastSnapshot)
      }
    })
  }

  const _onCreate = (c: Comments) => {
    if (c) setcommentsList(pre => [c, ...pre])
  }

  const _onDelete = useCallback(async (cId: string) => {
    await CommentsImplInstance.deleteComments(cId)
    setcommentsList((pre) => {
      const deleted = pre.findIndex(item => item.id === cId)
      if(deleted != -1) pre.splice(deleted, 1)
      return [...pre];
    })
  }, [])

  return (
    <CommentsListView
      metadata={metadata}
      parent={{
        id: parent?.id,
        path: parent?.path
      }}
      commentsList={commentsList}
      main={main}
      infoData={infoData}
      onCreate={_onCreate}
      loadMore={lastSnapshot !== null ? _loadMore : undefined}
      onDelete={_onDelete}
    />
  )
}

const CommentsListView = ({
  commentsList,
  parent,
  main,
  onCreate,
  loadMore,
  onDelete,
  infoData,
  metadata
}: {
  commentsList: Array<Comments>
  parent: any
  main?: boolean
  onCreate: Function
  loadMore?: Function
  onDelete: Function
  infoData: any,
  metadata: any
}) => {
  const [isMainComment, setisMainComment] = useState<boolean>(
    parent.path !== 'comments'
  )

  return (
    <div className={style.commentsList}>
      {main && (
        <CreateFormComment metadata={metadata} description={infoData.description} parent={parent} onCreate={(res: Comments) => onCreate(res)} />
      )}

      {parent.path != 'comments' && commentsList.length > 0 ? <h2>{infoData?.mainTitle}</h2> : <></>}
      {commentsList.map((comment, index) => {
        return (
          <div
            className={`${style.commentsItem} ${
              isMainComment ? style.threadContainer : style.replysContainer
            }`}
            key={comment.id}
          >
            <SingleComment
              isLastChild={commentsList.length - 1 === index}
              comment={comment}
              onDelete={onDelete}
              metadata={metadata}
            />
          </div>
        )
      })}
      {loadMore && commentsList.length > 4 && (
        <div className='text-align-center'>
          <ButtonApp
            buttonStyle='link'
            labelID='Cargar más'
            onClick={() => loadMore()}
            type='button'
          />
        </div>
      )}
    </div>
  )
}

export default CommentsListApp
