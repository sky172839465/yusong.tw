import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLocation, useNavigation } from 'react-router-dom'

import useI18N, { LANG } from '@/hooks/useI18N'

const i18nMapping = {
  [LANG.EN]: {
    TITLE: 'Loading'
  },
  [LANG.ZH_TW]: {
    TITLE: '載入中'
  }
}

const useScrollRestoration = () => {
  const { pathname } = useLocation()
  const navigation = useNavigation()
  const [loading, setLoading] = useState(false)
  const timer = useRef()

  useEffect(() => {
    setLoading(true)

    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'auto' })
      setTimeout(() => setLoading(false), 120)
    }, 100)
    return () => clearTimeout(timer.current)
  }, [pathname, navigation])

  return { loading, setLoading }
}

const BlurScrollRestoration = (props) => {
  const { children } = props
  const { loading } = useScrollRestoration()
  const { label } = useI18N(i18nMapping)

  return (
    <>
      {loading && (
        <Helmet>
          <title>
            {label.TITLE}
          </title>
        </Helmet>
      )}
      <div className={`contents ${loading ? '[&_main]:opacity-0' : ''}`}>
        {children}
      </div>
    </>
  )
}

export default BlurScrollRestoration
