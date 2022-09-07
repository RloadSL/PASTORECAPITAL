import React from 'react'
import { useSystem } from 'ui/hooks/system.hooks'

const Loading = () => {
  const {loadingState} = useSystem()
  return <LoadingView loadingState={loadingState}/>
}

const LoadingView = ({loadingState}:{loadingState:boolean}) => {
  return loadingState ? <div>Loading...</div> : null;
}


export default Loading;