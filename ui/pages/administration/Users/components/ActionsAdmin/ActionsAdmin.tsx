import ButtonApp from 'components/ButtonApp'
import React from 'react'

const ActionsAdmin = ({onLoadMore}:any) => {
  return (
    <div>
      <ButtonApp onClick={onLoadMore}>
        Load More
      </ButtonApp>
    </div>
  )
}

export default ActionsAdmin