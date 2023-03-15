import ButtonApp from 'components/ButtonApp'
import ItemList from 'components/ItemList'
import Loading from 'components/Loading'
import LoadMoreLoading from 'components/LoadMoreLoading'
import systemRepository from 'infrastructure/repositories/system.repository'
import React, { useEffect, useState } from 'react'
import style from './invoices-admin.module.scss'

const InvoicesAdmin = () => {
  const [query, setquery] = useState<{ page?: string, created: number }>({ page: undefined, created: Math.floor(Date.now() / 1000) })
  const [invoices, setInvoices] = useState<any[]>([])
  const [loading, setloading] = useState(false)
  useEffect(() => {
    getData();
  }, [])

  const getData = () => {
    setloading(true)
    systemRepository.getStripeInvoices(query)
      .then(res => {
        setInvoices([...invoices, ...res.data])
        setloading(false)
        if (res.has_more) {
          setquery({ page: res.next_page, created: Math.floor(Date.now() / 1000) })
        }
      })
  }

  const renderInvoiceItem = (item: any) => {
    let description, pdflink, created, customer_name;
    if (item.lines) {
      description = item.lines.data[item.lines.data.length - 1].description || item.description
    } else {
      description = 'Factura incompleta'
    }
    created = item.created;
    pdflink = item.invoice_pdf
    customer_name = item.customer_name
    return (<div className={style.invoiceItemList_content}>
      <div className={style.invoiceItemList_content__first}>
        <span className={style.plan}>{description}</span>
        <span className={style.name}>{customer_name}</span>
      </div>
      <div className={style.invoiceItemList_content__second}>
        <span>{new Date(created * 1000).toLocaleDateString(['es-ES'])}</span>
        <a className={style.downloadBtn} href={pdflink}>
          <span>Descargar PDF</span>
        </a>
      </div>
    </div>)
  }

  return (
    <div className={style.invoicesAdmin}>
      <div className='max-container'>
        <header>
          <h1 className='main-title'>Facturas generadas</h1>
          <p>Para un mayor desglose de información acceda al <a target={'_blank'} rel="noreferrer" style={{ color: 'blue' }} href='https://dashboard.stripe.com/invoices'>Panel de Administración de Stripe</a></p>
        </header>

        <ItemList>
          {
            invoices.map((item: any) => (<div className={style.invoiceItemList} key={item.id}>
              {renderInvoiceItem(item)}
            </div>))
          }
        </ItemList>
        {
          loading && <div>
            <LoadMoreLoading></LoadMoreLoading>
          </div>
        }
        {query.page && <div>
          <ButtonApp buttonStyle={'link'} onClick={getData} labelID='btn.loadMore' />
        </div>}
      </div>
    </div>
  )
}

export default InvoicesAdmin