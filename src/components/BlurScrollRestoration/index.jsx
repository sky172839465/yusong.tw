import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLocation, useNavigation } from 'react-router-dom'

import FadeIn from '@/components/FadeIn'
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
  const loading = useRef()

  useEffect(() => {
    setLoading(true)
    
    if (navigation.state === 'loading') {
      loading.current = true
      return
    }

    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      if (loading.current) {
        window.scrollTo({ top: 0, behavior: 'auto' })
      }

      setTimeout(() => {
        loading.current = false
        setLoading(false)
      }, 100)
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
      <FadeIn className={`contents ${loading ? '[&_main]:invisible' : ''}`}>
        {children}
      </FadeIn>
    </>
  )
}

export default BlurScrollRestoration
