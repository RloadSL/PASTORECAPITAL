import React from 'react'
import ConsultantsStats from './Consultants'
import UsersStats from './UsersStats'

const Stats = () => {
  return (
    <div>
      <h1>Estadisticas generales de Pastore Capital</h1>
       <div>
        <UsersStats></UsersStats>
      </div>
      <div>
        <ConsultantsStats/>
      </div>
     
    </div>
  )
}

export default Stats