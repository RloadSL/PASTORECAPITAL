/* eslint-disable react-hooks/exhaustive-deps */
import ReadingProgressBar from 'components/ReadingProgressBar'
import { Post } from 'domain/Post/Post'
import { NextPage } from 'next'
import { Suspense, useContext, useEffect, useRef, useState } from 'react'
import { article } from 'ui/utils/test.data'
import style from './analysisArticleDetail.module.scss'
import parse from 'html-react-parser'
import WordpressHeader from 'WordpressHeader'
import SocialMediaButtons from 'components/SocialMediaButtons'
import { PostDto } from 'infrastructure/dto/post.dto'
import { useRouter } from 'next/router'
import { WP_EDIT_POST } from 'infrastructure/wordpress/config'
import { useSelector } from 'react-redux'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import LinkApp from 'components/LinkApp'
import ButtonApp from 'components/ButtonApp'

import iconEdit from '../../../../assets/img/icons/pencil.svg'
import iconDelete from '../../../../assets/img/icons/trash.svg'
import { FormattedMessage } from 'react-intl'
import AlertApp from 'components/AlertApp'
import { AnalysisRepositoryInstance } from 'infrastructure/repositories/analysis.repository'
import { LOGO_PASTORE_URL } from 'infrastructure/contants'
import { SubscriptionGranted } from 'components/AppLayout/AppLayout'
import InputCheckFormikApp from 'components/FormApp/components/InputCheckFormikApp '
import { getCategoriesPlans } from 'infrastructure/wordpress/wp.utils'
import { Field, Form, Formik } from 'formik'
import LoadMoreLoading from 'components/LoadMoreLoading'

const AnalysisArticleDetail: NextPage<any> = ({ post }: { post: PostDto }) => {
  const { wpToken } = useSelector(getUserLogged) || {}
  const { replace, reload } = useRouter()
  

  const editLink = (useRef<any>().current = wpToken
    ? `${WP_EDIT_POST}?post=${post.id}&action=edit&?&token=${wpToken}`
    : undefined)

  const _onDeleteArt = async () => {
    if (wpToken) {
      await AnalysisRepositoryInstance.deleteArticle(post.id, wpToken)
      replace('/analysis', undefined, { shallow: true })
    }
  }
  const _onUpdatePlan = async ({ activated_to_plan }: any) => {
    if (wpToken) {
      await AnalysisRepositoryInstance.setPlanArticle(
        post.id,
        activated_to_plan,
        wpToken
      )
      reload()
    }
  }
  return (
    <AnalysisArticleDetailView
      onDeleteArt={_onDeleteArt}
      post={new Post(post)}
      editLink={editLink}
      onUpdatePlan={_onUpdatePlan}
    ></AnalysisArticleDetailView>
  )
}

const AnalysisArticleDetailView = ({
  post,
  editLink,
  onDeleteArt,
  onUpdatePlan
}: {
  post: Post
  editLink?: string
  onDeleteArt: Function
  onUpdatePlan: Function
}) => {
  const contentRef = useRef<any>()
  const [deleteArticle, setDeleteArticle]: [
    { id: number; status: string } | null,
    Function
  ] = useState(null)
  const [createArt, setCreateArt] = useState(false)
  const [loading, setloading] = useState(false)

  const { query, asPath } = useRouter()
  const plans = useRef<any>(post.getCatgoryByParent('plans'))
  
  const [categoriesPlans, setCategoriesPlans] = useState<any>(null)

  useEffect(() => {
    if (!categoriesPlans && createArt) {
      getCategoriesPlansWP().then(res => setCategoriesPlans(res))
    }
  }, [createArt])

  const getCategoriesPlansWP = async () => {
    const response = await getCategoriesPlans()
    if (Array.isArray(response)) {
      return response.map(term => {
        return {
          value: term.term_id,
          label: term.name,
          key: term.slug
        }
      })
    } else {
      return []
    }
  }

  const updatePlan = () => (
    <div className='checklist'>
      <p style={{ textAlign: 'center' }}>Seleccione el plan correspondiente</p>
      <div
        role='group'
        style={{ display: 'flex' }}
        aria-labelledby='checkbox-group'
      >
        <Formik
          initialValues={{
            activated_to_plan: plans.current?.term_id?.toString()
          }}
          onSubmit={values => {
            onUpdatePlan(values)
            setCreateArt(false)
          }}
        >
          {({ values, errors, touched }) => (
            <Form className={style.form}>
              <div
                style={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'center'
                }}
              >
                {categoriesPlans.map((plan: any) => (
                  <div role='group' key={plan.key}>
                    <label>
                      <Field
                        type='radio'
                        name='activated_to_plan'
                        value={plan.value.toString()}
                      />
                      {plan.label}
                    </label>
                  </div>
                ))}
              </div>
              <div
                style={{
                  marginTop: '20px',
                  maxWidth: '300px',
                  margin: 'auto'
                }}
              >
                <ButtonApp
                  buttonStyle='secondary'
                  type='submit'
                  labelID='page.analysis.articles.form.update'
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )

  return (
    <div className={style.lessonPage} ref={contentRef}>
      <WordpressHeader
        title={post.title.rendered}
        metaDescription={post.excerpt.rendered}
        metaThumbnail={post.thumbnail_url || LOGO_PASTORE_URL}
      />
      <ReadingProgressBar target={contentRef} />
      <div className={style.readingContainer}>
        <div className={style.headerLesson}>
          {editLink && (
            <div
              className='admin-buttons-container'
              style={{ maxWidth: '100%' }}
            >
              <div className='edit-delete-buttons'>
                <LinkApp
                  label={'btn.edit'}
                  linkStyle={'edit'}
                  linkHref={editLink}
                  icon={iconEdit}
                />
                <ButtonApp
                  labelID={'btn.delete'}
                  onClick={() =>
                    setDeleteArticle({ id: post.id, status: post.status })
                  }
                  type='button'
                  buttonStyle='delete'
                  size='small'
                  icon={iconDelete}
                />
              </div>
              <div className='flex-container align-center'>
                <span>Usuario:</span>
                {!loading ? (
                  <ButtonApp
                    onClick={() => {
                      setloading(true)
                      setCreateArt(true)
                    }}
                    type='button'
                    buttonStyle={['primary', 'outlined']}
                    size='small'
                    // icon={iconDelete}
                  >
                    {plans.current.map((item:any)=> item.name).toString()}
                  </ButtonApp>
                ) : (
                  <LoadMoreLoading />
                )}
              </div>
            </div>
          )}
          <p className='small-caps'>{query.category_name}</p>
          <h1 className='main-title'>{post.title.rendered}</h1>
          <p className='author'>
            {post.author?.name} |{' '}
            <span className='date'>{post.created_at.toISOString()}</span>
          </p>
        </div>
        <div className={style.post}>{parse(post.content?.rendered || '')}</div>
        <div className={style.socialSharing}>
          <SocialMediaButtons
            title={post.title.rendered}
            url={asPath}
            description={post.excerpt.rendered}
          />
        </div>
      </div>
      {deleteArticle && (
        <Suspense>
          <AlertApp
            title='page.analysis.articles.form.remove.title'
            visible={deleteArticle}
            onAction={() => {
              onDeleteArt(deleteArticle)
            }}
            onCancel={() => setDeleteArticle(null)}
          >
            <p>
              <FormattedMessage id='page.analysis.articles.form.remove.content' />
            </p>
          </AlertApp>
        </Suspense>
      )}

      {createArt && (
        <Suspense>
          <AlertApp
            title='page.analysis.articles.form.update'
            visible={createArt}
            onCancel={() => {
              setCreateArt(false)
              setloading(false)
            }}
          >
            {categoriesPlans && updatePlan()}
          </AlertApp>
        </Suspense>
      )}
    </div>
  )
}

export default AnalysisArticleDetail
