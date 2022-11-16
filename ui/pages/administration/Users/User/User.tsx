import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

const User:NextPage<any> = () => {
  const {query} = useRouter();

  
  return (
    < UserView />
  )
}

const UserView = () => {
  return (
    <div>User detail</div>
  )
}

export default User