import { Webinars } from 'domain/Webinars/Webinars'
import React from 'react'

function ItemListWebinar({item}:{item: Webinars}) {
  return (
    <div>{item.title}</div>
  )
}

export default React.memo(ItemListWebinar)