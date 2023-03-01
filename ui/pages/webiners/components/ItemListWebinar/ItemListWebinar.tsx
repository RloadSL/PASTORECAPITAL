import Card from 'components/Card'
import { Webinars } from 'domain/Webinars/Webinars'
import React from 'react'

function ItemListWebinar({item, onClick}:{item: Webinars, onClick:Function}) {
  return (
    <div style={{padding:'10px'}}>
    <Card>
      <div onClick={()=>onClick(item.id)} style={{padding:'10px', cursor: 'pointer'}}>
        <h2>{item.title}</h2>
        <p>{item.description}</p>
      </div>
    </Card>
    </div>
    
   
  )
}

export default React.memo(ItemListWebinar)