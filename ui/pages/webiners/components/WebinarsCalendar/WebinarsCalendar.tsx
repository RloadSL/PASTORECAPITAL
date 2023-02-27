import { Webinars } from "domain/Webinars/Webinars";
import React, { Component, useState } from "react";
import Calendar from "react-calendar";
//import "react-calendar/dist/Calendar.css";
import style from './calendar.module.scss'
const WebinarsCalendar = ({items}:{items:Webinars[]})=> {
  const setClass = (date:Date) => {
    const dateobj =
      items &&
      items.find((w) => {
        return (
          date.getDay() === new Date(w.date).getDay() &&
          date.getMonth() === new Date(w.date).getMonth() &&
          date.getDate() === new Date(w.date).getDate()
        );
      });
    return dateobj ? style['highlight'] : "";
  };


 
    return (
      <Calendar
        tileClassName={({ activeStartDate, date, view }) => setClass(date)}
      />
    );
  
}

export default WebinarsCalendar;