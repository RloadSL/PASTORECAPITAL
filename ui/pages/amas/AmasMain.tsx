/* eslint-disable react-hooks/exhaustive-deps */
import ButtonApp from 'components/ButtonApp'
import PostExcerpt from 'components/PostExcerpt'
import { Chatroom } from 'domain/Chatroom/Chatroom'
import amasRepository from 'infrastructure/repositories/amas.repository'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
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

const AmasMain = () => {
  const userLogged = useSelector(getUserLogged)
  const { push } = useRouter()
  const [updateChatroom, setupdateChatroom] = useState(false)
  const [visibleAlertDownloadPdf, setVisibleAlertDownloadPdf] = useState<
    Chatroom | undefined
  >()
  const dispatch = useDispatch<AppDispatch>()

  const { amas, query, handleSearchAmas, onFilter, pages, loadMore } = useAmas()

  useEffect(() => {
    let fetch = true
    handleSearchAmas()
    return () => {
      fetch = false
    }
  }, [query])

  const openChatroom = (chatroom: Chatroom) => {
    dispatch(cleanMessages())
    dispatch(setChatroom(chatroom))
    push(`/amas/${chatroom.id}`)
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
              onClose={() => setupdateChatroom(false)}
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
                onChange={(values:any)=>onFilter(undefined, values)}
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
              item.state === 'closed'
                ? setVisibleAlertDownloadPdf(item)
                : openChatroom(item)
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
                        : 'page.amas.roomLabel.closed'
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
              onClick={() => setupdateChatroom(true)}
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
    </div>
  )
}

export default AmasMain
