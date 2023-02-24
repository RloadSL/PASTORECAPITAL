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

const AmasMain = () => {
  const userLogged = useSelector(getUserLogged)
  const { push } = useRouter()
  const [updateChatroom, setupdateChatroom] = useState(false)
  const [chatrooms, setchatrooms] = useState<Chatroom[]>([])
  const [visibleAlertDownloadPdf, setVisibleAlertDownloadPdf] =
    useState<Chatroom | undefined>()
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    let fetch = true
    amasRepository.getChatRooms().then(res => setchatrooms(res as Chatroom[]))
    return () => {
      fetch = false
    }
  }, [userLogged?.uid])

  const openChatroom = (chatroom: Chatroom) => {
    dispatch(cleanMessages())
    dispatch(setChatroom(chatroom))
    push(`/amas/${chatroom.id}`)
  }

  const downloadPdf = async (chatroom: Chatroom) => {
    const url = await chatroom.downloadPDF()
    window.open(url, '_black')
    setVisibleAlertDownloadPdf(undefined);
  }

  const windowSize = useWindowSize();
  const initialValues: {
    title: string,
  } = {
    title: '',
  }

  return (
    <div className={style.amas}>
      <header>
        <p className={`${style.topTitle} main-title`}>
          <FormattedMessage id='mainMenu.item.label.amas' />
        </p>
        <p>
          <FormattedMessage id="loremipsum" />
        </p>
      </header>
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
      <div className={style.filtersContainer}>
        <div className={style.filtersContainer_searchBar}>
          <SearchBar
            enableTags={false}
            onFilter={(f: any) => {
              // onFilter(f.search)
              console.log('buscar')
            }}
          />
        </div>
        <div className={style.filtersContainer_select}>
          <Formik
            initialValues={initialValues}
            validationSchema={'validationSchema'}
            onSubmit={() => console.log('enviar datos')}
          >
            <Form>
              <SelectFormikApp
                selectOptions={[
                  { value: '', label: 'All' },
                  { value: 'active', label: 'Open' },
                  { value: 'closed', label: 'CLosed' }
                ]}
                labelID={'page.amas.selectRoom.label'}
                name={'rooms'}
              />
            </Form>
          </Formik>
        </div>
      </div>
      <div className={style.chatRoom_grid}>
        {chatrooms.map(
          (
            item
          ) => (
            <div
              className={style.chatRoom_grid_item}
              key={item.id}
              onClick={() => {
                item.state === 'closed' ? setVisibleAlertDownloadPdf(item) : openChatroom(item)
              }}
            >
              <Card>
                <div className={style.cardContainer}>
                  <PostExcerpt
                    thumbnail={item.thumb?.url}
                    title={item.title}
                    description={item.excerpt || ''}
                    level={{ label: item.state}}
                    componentStyle={windowSize.width >= 1500 ? 'column' : 'row'}
                    hasSeparator={false}
                    chips={[{label:item.interviewee.fullname,icon:clockIcon}]}
                  />
                </div>
              </Card>
            </div>
          )
        )}
      </div>
      {visibleAlertDownloadPdf && (
        <AlertApp
          title='Download pdf'
          onAction={() => downloadPdf(visibleAlertDownloadPdf)}
          visible
          onCancel={() => setVisibleAlertDownloadPdf(undefined)}
        >
          <div>
            Esta sala esta cerrada quieres descargar el pdf.
          </div>
        </AlertApp>
      )}
    </div>
  )
}

export default AmasMain
