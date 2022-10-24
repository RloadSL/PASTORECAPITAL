import { NextPage } from 'next'
import React from 'react'
import styles from "Categories.module.scss";

const AnalysisCategories:NextPage<any> = () => {
  return (
    <AnalysisCategoriesView></AnalysisCategoriesView>
  )
}

const AnalysisCategoriesView = () => {
  return (
    <div>Categories</div>
  )
}

export default AnalysisCategories