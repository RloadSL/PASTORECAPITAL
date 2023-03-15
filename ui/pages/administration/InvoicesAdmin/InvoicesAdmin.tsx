import ButtonApp from 'components/ButtonApp'
import ItemList from 'components/ItemList'
import Loading from 'components/Loading'
import LoadMoreLoading from 'components/LoadMoreLoading'
import systemRepository from 'infrastructure/repositories/system.repository'
import React, { useEffect, useState } from 'react'

const InvoicesAdmin = () => {
  const [query, setquery] = useState<{page?:string , created:number}>({page:undefined, created: Math.floor(Date.now()/1000)})
  const [invoices, setInvoices] = useState<any[]>([])
  const [loading, setloading] = useState(false)
  useEffect(() => {
    getData();
  }, [])
  
  const getData = ()=>{
    setloading(true)
    systemRepository.getStripeInvoices(query)
    .then(res => {
      setInvoices([...invoices, ...res.data])
      setloading(false)
      if(res.has_more){
        setquery({page: res.next_page, created: Math.floor(Date.now()/1000)})
      }
    })
  }
  
  const renderInvoiceItem = (item:any)=>{
    let description, pdflink, created,customer_name;
    if(item.lines){
      description = item.lines.data[item.lines.data.length - 1].description || item.description
    }else{
      description = 'Factura incompleta'
    }
    created = item.created;
    pdflink = item.invoice_pdf
    customer_name = item.customer_name
    return (<div>
      <div>{description}</div>
      <div>{customer_name}</div>
      <a href={pdflink}>Descargar PDF</a>
      <div>{new Date(created * 1000).toLocaleDateString(['es-ES'])}</div>
    </div>)
  }

  return ( 
    <div>
      <div>
        <h3>Facturas completadas en Pastore Capital</h3>
        <p>Para un mayor desglose de información acceda al <a target={'_blank'} rel="noreferrer"  style={{color: 'blue'}} href='https://dashboard.stripe.com/invoices'>Panel de Administración de Stripe</a></p>
      </div>

      <ItemList>
        {
          invoices.map((item: any) => (<div key={item.id}>
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
        <ButtonApp onClick={getData}>
          Load more
        </ButtonApp>
      </div>}
    </div>
  )
}

export default InvoicesAdmin