import ItemList from 'components/ItemList'
import style from './invoices.module.scss'
import { FormattedMessage } from 'react-intl'
import ContentItemList from '../components/contentItemList/ContentItemList'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'ui/redux/store'
import { useSelector } from 'react-redux'
import {
  getInvoices,
  getUserInformationLoading
} from 'ui/redux/slices/user-information/user-information.selectors'
import { useEffect } from 'react'
import {
  cleanInvoices,
  getInvoices as getData
} from 'ui/redux/slices/user-information/user-information.slice'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'

import Modal from 'components/Modal'
interface invoicesProps {}

const Invoices = ({}: invoicesProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const invoices = useSelector(getInvoices)
  const fetching = useSelector(getUserInformationLoading)
  const userLogged = useSelector(getUserLogged)
  useEffect(() => {
    dispatch(cleanInvoices())
    _getData()
  }, [userLogged?.email])
  const _getData = () => {
    if (!fetching && userLogged?.email) {
      dispatch(cleanInvoices)
      dispatch(getData(userLogged?.email))
    }
  }

  const actionsItemList = {
    view: {
      label: 'contextualMenu.item.label.donwload',
      action: async (item: any) =>{ 
        window.open(item.invoice_pdf, '_blank')
      } 
    }
  }

  return (
    <div className={style.invoices}>
      <h1 className='main-title'>
        <FormattedMessage id={'page.invoices.title'} />
      </h1>
      <div className={style.invoices_container}>
        <ItemList
          items={invoices.invoices.map((invoice: any) => (
            <ContentItemList
             activeDot={true}
              actions={actionsItemList}
              key={invoice.id}
              message={invoice.description || invoice.lines.data[0].description}
              item={invoice}
            />
          ))}
        />
      </div>
    </div>
  )
}

export default Invoices
