import { Webinars } from 'domain/Webinars/Webinars'
import React, { Component, useEffect, useState } from 'react'
import Calendar from 'react-calendar'
//import "react-calendar/dist/Calendar.css";
import style from './calendar.module.scss'
const WebinarsCalendar = ({ items }: { items: Webinars[] }) => {
  const [rendered, setRendered] = useState(false)
  useEffect(() => {
    setRendered(true)
  }, [])
  
  const setClass = (date: Date) => {
    const dateobj =
      items &&
      items.find(w => {
        return (
          date.getDay() === new Date(w.date).getDay() &&
          date.getMonth() === new Date(w.date).getMonth() &&
          date.getDate() === new Date(w.date).getDate()
        )
      })
    return dateobj ? style['highlight'] : ''
  }

  return (
    <>
      {rendered && 
      <Calendar
        tileClassName={({ activeStartDate, date, view }) => setClass(date)}
      />}
    </>
  )
}

export default WebinarsCalendar
