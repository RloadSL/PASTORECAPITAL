import React, { useEffect, useState } from 'react'
import style from './cookie-advicer.module.scss'
import CookieSwitcher from './CookieSwitcher'
import { removeCookies } from 'cookies-next'

interface CookieAdvicerProps {
  cookies_items: COOKIES_ITEMS
}

export interface COOKIES_ITEMS {
  social: { item: string; description: string }[]
  advertising: { item: string; description: string }[]
  analytics: { item: string; description: string }[]
  personalized: { item: string; description: string }[]
}

type cookies_keys = 'social' | 'advertising' | 'analytics' | 'personalized'

const CookieAdvicer = ({ cookies_items }: CookieAdvicerProps) => {
  const [isVisibleModal, setIsVisibleModal] = useState<Boolean>(false)
  const [isAdviceOpen, setIsAdviceOpen] = useState<Boolean>(true)
  const [switcherState, setSwitcherState] = useState<any>({
    social: true,
    advertising: true,
    analytics: true,
    personalized: true
  })

  useEffect(() => {
    localStorage.setItem('switcherState', JSON.stringify(switcherState))
  }, [switcherState])

  useEffect(() => {
    const stSwitcherState = localStorage.getItem('switcherState')

    if (stSwitcherState) {
      setSwitcherState(JSON.parse(stSwitcherState))
      handleConfirmation(JSON.parse(stSwitcherState))
    }
  }, [])

  /**
   * Abre el modal de gestion de cookies
   */
  const handlePreferences = () => {
    setIsVisibleModal(true)
  }
  /**
   * Acepta todas las cookies cookies
   */
  const handleAcceptClose = () => {
    setIsAdviceOpen(false)
    localStorage.setItem('cookies_compliance', 'accepted')
  }
  /**
   * Guarda la configuración de cookies del cliente
   */
  const handleConfirmation = (stSwitcherState?: any, closeModal?: boolean) => {
    closeModal && setIsAdviceOpen(false)

    const state = stSwitcherState || switcherState

    Object.keys(state).forEach(keys => {
      if (!state[keys]) {
        cookies_items[keys as cookies_keys].forEach(cookie => {
          removeCookies(cookie.item)
        })
      }
    })

    localStorage.setItem('cookies_compliance', 'accepted')
  }
  /**
   * Borra todas las cookies menos las necesarias
   */
  const handleReject = () => {
    setIsAdviceOpen(false)
    Object.values(cookies_items).forEach(value => {
      value.forEach((cookie: any) => {
        removeCookies(cookie.item)
      })
    })
  }

  const handleToggle = (switcherState: any) => {
    setSwitcherState((prev: any) => ({ ...prev, ...switcherState }))
  }
  return (
    isAdviceOpen && (
      <div className={style.cookieAdvicer}>
        <div
          className={style.cookieAdvicer_banner}
          style={isVisibleModal ? { display: 'none' } : { display: 'block' }}
        >
          <div className={style.content}>
            <p>
              Utilizamos cookies propias y de terceros y tecnologías similares
              para mejorar nuestro sitio, analizar nuestro tráfico, proporcionar
              funcionalidades para redes sociales y personalizar el contenido y
              la publicidad en función de tus hábitos de navegación, que aceptas
              haciendo clic en el botón Aceptar. Más información sobre nuestra.
            </p>
            <div className={style.actions}>
              <button
                className={style.button_transparent}
                type='button'
                onClick={handlePreferences}
              >
                Gestionar preferencias
              </button>
              <button
                className={style.button_primary}
                type='button'
                onClick={handleAcceptClose}
              >
                Aceptar y cerrar
              </button>
            </div>
          </div>
        </div>
        {isVisibleModal && (
          <div className={style.cookieAdvicer_modal}>
            <button
              className={style.close}
              type='button'
              onClick={() => setIsVisibleModal(false)}
            >
              <span className='only-readers'>cerrar</span>
            </button>
            <div className={style.content}>
              <h3>Preferencias de privacidad</h3>
              <p>
                Cuando visita cualquier sitio web, el mismo podría obtener o
                guardar información en su navegador, generalmente mediante el
                uso de cookies. Esta información puede ser acerca de usted, sus
                preferencias o su dispositivo, y se usa principalmente para que
                el sitio funcione según lo esperado. Por lo general, la
                información no lo identifica directamente, pero puede
                proporcionarle una experiencia web más personalizada. Ya que
                respetamos su derecho a la privacidad, usted puede escoger no
                permitirnos usar ciertas cookies. Haga clic en los encabezados
                de cada categoría para saber más y cambiar nuestras
                configuraciones predeterminadas. Sin embargo, el bloqueo de
                algunos tipos de cookies puede afectar su experiencia en el
                sitio y los servicios que podemos ofrecer.
              </p>
              <div className={style.cookieInfo}>
                <div className={style.cookieInfo_block}>
                  <div className={style.top}>
                    <h4>Estrictamente necesarias</h4>
                    <CookieSwitcher
                      handleToggle={handleToggle}
                      isDisabled={true}
                      inputName='necessary'
                    />
                  </div>
                  <p>
                    Estas cookies son estrictamente necesarias para el
                    funcionamiento del Sitio Web. Permiten la navegación del
                    Usuario a través del Sitio Web así como el uso de las
                    distintas opciones y servicios que el Sitio Web le ofrece.
                    Sin ellas, ciertas funcionalidades del Sitio Web no
                    operarían correctamente.
                  </p>
                </div>
                <div className={style.cookieInfo_block}>
                  <div className={style.top}>
                    <h4>Analíticas</h4>
                    <CookieSwitcher
                      handleToggle={handleToggle}
                      inputName='analytics'
                    />
                  </div>
                  <p>
                    Estas cookies de terceros almacenan información sobre cómo
                    los Usuarios interactúan con el contenido del Sitio Web,
                    sobre su procedencia, sobre el navegador que están
                    utilizando y el tiempo que permanecen en cada página, entre
                    otra información. Se utilizan para medir audiencias y para
                    elaborar estadísticas.
                  </p>
                </div>
                <div className={style.cookieInfo_block}>
                  <div className={style.top}>
                    <h4>Redes Sociales</h4>
                    <CookieSwitcher
                      handleToggle={handleToggle}
                      inputName='social'
                    />
                  </div>
                  <p>
                    Estas cookies de terceros almacenan información sobre cómo
                    los Usuarios interactúan con el contenido del Sitio Web,
                    sobre su procedencia, sobre el navegador que están
                    utilizando y el tiempo que permanecen en cada página, entre
                    otra información. Se utilizan para medir audiencias y para
                    elaborar estadísticas.
                  </p>
                </div>
                <div className={style.cookieInfo_block}>
                  <div className={style.top}>
                    <h4>Publicidad personalizada</h4>
                    <CookieSwitcher
                      handleToggle={handleToggle}
                      inputName='advertising'
                    />
                  </div>
                  <p>
                    Estas cookies de terceros almacenan información
                    comportamental del Usuario, obtenida a partir del análisis
                    de sus hábitos de navegación, y nos permiten a nosotros o a
                    terceros mostrar publicidad acorde al comportamiento e
                    intereses del Usuario, o rastrear el comportamiento y la
                    eficacia de campañas de publicidad.
                  </p>
                </div>
                <div className={style.cookieInfo_block}>
                  <div className={style.top}>
                    <h4>Cookies de personalización</h4>
                    <CookieSwitcher
                      handleToggle={handleToggle}
                      inputName='personalized'
                    />
                  </div>
                  <p>
                    Estas cookies recopilan información sobre la forma en que
                    los Usuarios utilizan el Sitio Web y la recuerdan para
                    permitir que el acceso del Usuario al Sitio Web se haga de
                    tal manera que la experiencia del Usuario sea única para él
                    y distinta a la de otros Usuarios.
                  </p>
                </div>
              </div>

              <div className={style.actions}>
                <button
                  className={style.button_transparent}
                  type='button'
                  onClick={() => handleReject()}
                >
                  Rechazarlas todas
                </button>
                <button
                  className={style.button_primary}
                  type='button'
                  onClick={() => handleConfirmation(null,true)}
                >
                  Confirmar preferencias
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  )
}

export default CookieAdvicer
