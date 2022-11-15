import LoadMoreLoading from 'components/LoadMoreLoading'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

function Redirect() {
  const { replace } = useRouter()
  useEffect(() => {
   replace('/administration/users/', undefined, {shallow: true})
  }, [replace])
  

  return (
    <div><LoadMoreLoading></LoadMoreLoading></div>
  )
}

export default Redirect