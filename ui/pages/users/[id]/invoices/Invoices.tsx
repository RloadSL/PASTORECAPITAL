import ItemList from 'components/ItemList'
import style from './invoices.module.scss'
import { invoices } from 'ui/utils/test.data'
import { FormattedMessage } from 'react-intl'
import ContentItemList from '../components/contentItemList/ContentItemList'

interface invoicesProps {
}

const Invoices = ({ }: invoicesProps) => {
  return <InvoicesView />
}

const InvoicesView = ({ }: invoicesProps) => {

  const actionsItemList = {
    view:{label:'contextualMenu.item.label.see',action: () => alert('ver factura')}
  } 

  return (
    <div className={style.invoices}>
      <h1 className='main-title'><FormattedMessage id={'page.invoices.title'}/></h1>
      <div className={style.invoices_container}>
        <ItemList items={invoices.map(invoice => <ContentItemList actions={actionsItemList} key={invoice.id} item={invoice} />)} />
      </div>
    </div>
  )
}

export default Invoices;