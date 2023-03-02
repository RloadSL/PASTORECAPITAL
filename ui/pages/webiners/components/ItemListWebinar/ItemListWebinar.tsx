import Card from 'components/Card'
import { Webinars } from 'domain/Webinars/Webinars'
import Image from 'next/image'
import React from 'react'

function ItemListWebinar({item, onClick, showThumb=false}:{item: Webinars, onClick:Function, showThumb?: boolean}) {
  return (
    <div style={{padding:'10px'}}>
    <Card>
      <div onClick={()=>onClick(item.id)} style={{padding:'10px', cursor: 'pointer'}}>
      {(showThumb && item.thumb?.url) && <div style={{height: 245, position: 'relative'}}>
          <Image layout='fill' src={item.thumb?.url} alt={item.title}/>
          </div>}
        <h2>{item.title}</h2>
        <p>{item.description}</p>
       
        <p>{item.date.toLocaleDateString()}, {item.date.toLocaleTimeString()}</p>
      </div>
    </Card>
    </div>
    
   
  )
}

export default React.memo(ItemListWebinar)