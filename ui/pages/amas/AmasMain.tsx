/* eslint-disable react-hooks/exhaustive-deps */
import ButtonApp from 'components/ButtonApp'
import PostExcerpt from 'components/PostExcerpt'
import { Chatroom } from 'domain/Chatroom/Chatroom'
import amasRepository from 'infrastructure/repositories/amas.repository'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { cleanMessages, setChatroom } from 'ui/redux/slices/amas/amas.slice'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import { AppDispatch } from 'ui/redux/store'
import CreateChatroom from './components/CreateChatroom/CreateChatroom'
import useWindowSize from 'ui/hooks/windowSize.hook'
import style from './amas-main.module.scss'
import Card from 'components/Card'
import addIcon from '../../../assets/img/icons/add.svg'
import clockIcon from '../../../assets/img/icons/clock.svg'
import { FormattedMessage } from 'react-intl'
import SearchBar from 'components/SearchBar'
import AlertApp from 'components/AlertApp'
import SelectFormikApp from 'components/FormApp/components/SelectFormikApp/SelectFormikApp'
import { Form, Formik } from 'formik'
import useAmas from './hooks/amas.hook'
import Loading from 'components/Loading'

const AmasMain = () => {
  const userLogged = useSelector(getUserLogged)
  const [loading, setloading] = useState(false)
  const { push } = useRouter()
  const [updateChatroom, setupdateChatroom] = useState(false)
  const [visibleAlertDownloadPdf, setVisibleAlertDownloadPdf] = useState<
    Chatroom | undefined
  >()
  const [coming_soon, setComing_soon] = useState<Chatroom | undefined>()
  const dispatch = useDispatch<AppDispatch>()

  const { amas, query, handleSearchAmas, onFilter, pages, loadMore } = useAmas()
  const isAdmasAdmin = useRef(
    userLogged?.role.level > 1
      ? true
      : userLogged?.checkColaborationPermisionByModule('AMAS')
      ? true
      : false
  ).current

  useEffect(() => {
    let fetch = true
    handleSearchAmas()
    return () => {
      fetch = false
    }
  }, [query])

  const openChatroom = async (chatroom: Chatroom) => {
    setloading(true)

    if (chatroom.state === 'coming_soon') {
      await amasRepository.setChatroom({ id: chatroom.id, state: 'active' })
    }
    dispatch(cleanMessages())
    dispatch(setChatroom(chatroom))
    push(`/amas/${chatroom.id}`)
    setloading(false)

  }

  const downloadPdf = async (chatroom: Chatroom) => {
    const url = await chatroom.downloadPDF()
    window.open(url, '_black')
    setVisibleAlertDownloadPdf(undefined)
  }

  const windowSize = useWindowSize()

  return (
    <div className={style.amas}>
      <header>
        <div>
          <p className={`${style.topTitle} main-title`}>
            <FormattedMessage id='mainMenu.item.label.amas' />
          </p>
          <p>
            <FormattedMessage id='loremipsum' />
          </p>
        </div>
        <div className={style.createRoomBtnContainer}>
          {userLogged?.role.level > 1 && (
            <ButtonApp
              buttonStyle='primary'
              labelID='page.amas.createRoom.label'
              onClick={() => setupdateChatroom(true)}
              type='button'
              icon={addIcon}
            />
          )}
          {updateChatroom && (
            <CreateChatroom
              onClose={() =>{
                setTimeout(() => {
                  setupdateChatroom(false)
                  onFilter(undefined, {state: undefined})
                }, 2000);
               
              }}
            ></CreateChatroom>
          )}
        </div>
      </header>

      <div className={style.filtersContainer}>
        <div className={style.filtersContainer_searchBar}>
          <SearchBar
            enableTags={false}
            onFilter={(f: any) => {
              onFilter(f.search)
            }}
          />
        </div>
        <div className={style.filtersContainer_select}>
          <Formik
            initialValues={{
              state: undefined
            }}
            onSubmit={values => {}}
          >
            <Form>
              <SelectFormikApp
                onChange={(values: any) => onFilter(undefined, values)}
                selectOptions={[
                  { value: undefined, label: 'All' },
                  { value: 'active', label: 'Open' },
                  { value: 'closed', label: 'Closed' }
                ]}
                labelID={'page.amas.selectRoom.label'}
                name={'state'}
              />
            </Form>
          </Formik>
        </div>
      </div>
      <div className={style.chatRoom_grid}>
        {amas.map(item => (
          <div
            className={style.chatRoom_grid_item}
            key={item.id}
            onClick={() => {
              switch (item.state) {
                case 'active':
                  openChatroom(item)
                  break
                case 'closed':
                  setVisibleAlertDownloadPdf(item)
                  break
                case 'coming_soon':
                  setComing_soon(item)
                  break
                default:
                  break
              }
            }}
          >
            <Card>
              <div className={style.cardContainer}>
                <PostExcerpt
                  thumbnail={item.thumb?.url}
                  title={item.title}
                  description={item.excerpt || ''}
                  level={{
                    label: `${
                      item.state === 'active'
                        ? 'page.amas.roomLabel.open'
                        : item.state === 'closed'
                        ? 'page.amas.roomLabel.closed'
                        : 'page.amas.roomLabel.comin_soon'
                    }`
                  }}
                  chipColor={item.state === 'active' ? 'green' : 'grey'}
                  componentStyle={windowSize.width >= 1500 ? 'column' : 'row'}
                  hasSeparator={false}
                  chips={[
                    {
                      label: `${item.created_at?.toLocaleDateString()} ${item.created_at?.toLocaleTimeString()}`,
                      icon: clockIcon
                    }
                  ]}
                />
              </div>
            </Card>
          </div>
        ))}
        {pages?.current < pages?.total_pages && (
          <div>
            <ButtonApp
              buttonStyle='link'
              labelID='btn.loadMore'
              onClick={() => loadMore()}
              type='button'
              icon={addIcon}
            />
          </div>
        )}
      </div>
      {visibleAlertDownloadPdf && (
        <AlertApp
          title={'page.amas.modalDownload.title'}
          onAction={() => downloadPdf(visibleAlertDownloadPdf)}
          visible
          onCancel={() => setVisibleAlertDownloadPdf(undefined)}
        >
          <div className={style.modalContainer}>
            <FormattedMessage id='page.amas.modalDownload.text' />
          </div>
        </AlertApp>
      )}
      {coming_soon && (
        <AlertApp
          title={'page.amas.coming_soon'}
          onAction={
            isAdmasAdmin
              ? () => openChatroom(coming_soon)
              : () => setComing_soon(undefined)
          }
          onCancel={isAdmasAdmin ? () => setComing_soon(undefined) : undefined}
          visible
        >
          {' '}
          <>
            {loading && <Loading loading />}
            {isAdmasAdmin ? (
              <div className={style.modalContainer}>
                <FormattedMessage id='page.amas.coming_soon.text_open' />
              </div>
            ) : (
              <div className={style.modalContainer}>
                <FormattedMessage id='page.amas.coming_soon.text' />
              </div>
            )}
          </>
        </AlertApp>
      )}
    </div>
  )
}

export default AmasMain
