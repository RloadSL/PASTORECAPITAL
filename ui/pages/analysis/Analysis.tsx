import UnderConstruction from 'components/UnderConstruction';
import { NextPage } from 'next'
import React from 'react'
import styles from "./Analysis.module.scss";
const Analysis: NextPage<any> = () => {
  return (
    <AnalysisView></AnalysisView>
  )
}

const AnalysisView = () => {
  return (
    <div>
      <UnderConstruction messageType="underconstruction"/>
    </div>
  )
}

export default Analysis