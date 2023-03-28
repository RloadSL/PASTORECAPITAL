import React, { useEffect, useRef, useState } from 'react'
import Chart from 'chart.js/auto'
import ChartDataLabels from 'chartjs-plugin-datalabels'

import style from './stats.module.scss'
import statsRepository from 'infrastructure/repositories/stats.repository'
const UsersStats = () => {
  const [charts, setCharts] = useState<{ doughnut?: Chart; line?: Chart }>({
    doughnut: undefined
  })
  const [totals, settotals] = useState<any>()
  const doughnutRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    Chart.register(ChartDataLabels)
    statsRepository.getUsersStats().then(response => {
      const { totals } = response as any
      const data_1 = totals.doughnut.data.datasets[0].data as Array<number>
      const total = data_1.reduce((p, c) => p + c)
      settotals({ total, data_1 })

      if (!charts.doughnut && doughnutRef.current) {
        createDoughnutChart(totals.doughnut)
      }

      if (!charts.line && lineRef.current) {
        createLineChart(totals.line)
      }
    })
  }, [])

  const createDoughnutChart = (config: any) => {
    const d = new Chart(doughnutRef.current as any, {
      ...config,
      options: {
        plugins: {
          datalabels: {
            color: 'white',
            labels: {
              title: {
                font: {
                  weight: 'bold',
                  size: 20
                }
              }
            }
          }
        }
      }
    })

    setCharts(pre => ({ ...pre, doughnut: d }))
  }

  const createLineChart = (config: any) => {
    const line = new Chart(lineRef.current as any, {
      ...config,
      options: {
        plugins: {
          datalabels: {
            color: 'black',
            labels: {
              title: {
                font: {
                  weight: 'bold',
                  size: 20
                }
              }
            }
          }
        }
      }
    })

    setCharts(pre => ({ ...pre, line: line }))
  }

  return (
    <div>
      <h2>Usuarios registrados</h2>
      <small>
        Las estadisticas de los usuarios se actualizan de madrugada.
      </small>

      <div className={style.row}>
        <div className={style.chartdata}>
          <p>Total de Usuarios registrados: {totals?.total}</p>
          <p>Guest: {totals?.data_1[0]}</p>
          <p>Basic: {totals?.data_1[0]}</p>
          <p>Plus: {totals?.data_1[0]}</p>
          <p>Premium: {totals?.data_1[0]}</p>
        </div>
        <div className={style.chart}>
          <canvas
            className={style.canvas}
            ref={doughnutRef}
            id='doughnut'
          ></canvas>
        </div>
      </div>
      <h2>Relacion alta de usuarios por meses del año 2023</h2>
      <div className={style.row}>
        <canvas
          height={100}
          className={style.canvas}
          ref={lineRef}
          id='line'
        ></canvas>
      </div>
    </div>
  )
}

export default UsersStats
