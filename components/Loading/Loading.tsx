import React from 'react'
import { useSystem } from 'ui/hooks/system.hooks'

const Loading = () => {
  const {loadingState} = useSystem()
  console.log('Loading',loadingState)
  return <LoadingView loadingState={loadingState}/>
}

const LoadingView = ({loadingState}:{loadingState:boolean}) => {
  return loadingState ? <div style={{height: 200}}>Loading...</div> : null;
}


export default Loading;