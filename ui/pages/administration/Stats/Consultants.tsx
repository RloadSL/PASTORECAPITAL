import React, { useEffect, useRef, useState } from 'react'
import Chart from 'chart.js/auto'
import ChartDataLabels from 'chartjs-plugin-datalabels'

import style from './stats.module.scss'
import statsRepository from 'infrastructure/repositories/stats.repository'
import Consultants from 'pages/tax-consultant/consultants'
const ConsultantsStats = () => {
  const [charts, setCharts] = useState<{ bubble?: Chart }>({
    bubble: undefined
  })
  const [data, setData] = useState<any[]>([])
  const bubbleRef = useRef(null)

  useEffect(() => {
    Chart.register(ChartDataLabels)
    statsRepository.getConsultantsStats().then(response => {
      const { bubble } = response as any
      if (charts.bubble) charts.bubble?.update()
      if (!charts.bubble && bubbleRef.current) {
        setData(bubble.data.datasets)
        createBubbleRefChart(bubble)
      }
    })
  }, [bubbleRef.current])

  const createBubbleRefChart = (config: any) => {
    const d = new Chart(bubbleRef.current as any, {
      ...config,
      options: {
        layout: {
          padding: 20
        },
        scales: {
          y: {
            title: {
              display: true,
              text: 'Total de clientes por consultor'
            },
            ticks: {
              stepSize: 1,
              beginAtZero: true 
            }
          },
          x: {
            title: {
              display: true,
              text: 'Total de servicios por consultor'
            },
            ticks: {
              minTicksLimit: 1,
              beginAtZero: true 
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          datalabels: {
            color: 'gray',
            align: 'bottom',
            formatter: value => `C: ${value.x} \nS: ${value.y}`,
            labels: {
              title: {
                font: {
                  weight: 'bold',
                  size: 16
                }
              }
            }
          }
        },
        maintainAspectRatio: true,
        title: {
          display: true,
          text: 'Predicted world population (millions) in 2050'
        }
      }
    })

    setCharts(pre => ({ ...pre, bubble: d }))
  }

  return (
    <div>
      <small>
        Debido al alto consumo de recursos las estadisticas de los consultores
        se actualizan en la madrugada.
      </small>

      <div className={style.row}>
        <div className={style.chartdata}>
          <h3>Datos de consultores </h3>
          {data && (
            <div>
              {data.sort((a, b) =>  b.data[0].x - a.data[0].x).map((item: any) => {
                return (
                  <div key={item.label} style={{borderBottom: '1px solid'}}>
                    <p>{item.label}</p>
                    <p>Clientes: {item.data[0].x}, Servicios: {item.data[0].y} </p>
                  </div>
                )
              })}
            </div>
          )}
        </div>
        <div className={style.chart}>
          <canvas className={style.canvas} ref={bubbleRef} id='bubble'></canvas>
        </div>
      </div>
    </div>
  )
}

export default ConsultantsStats
