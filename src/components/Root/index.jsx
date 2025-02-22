import { get } from 'lodash-es'
import { LazyMotion } from 'motion/react'
import { lazy, useEffect, useRef } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import toast, { Toaster } from 'react-hot-toast'
import { Outlet, useLocation } from 'react-router-dom'
import { SWRConfig } from 'swr'

import fetcher from '../../utils/fetcher'
import CustomSwipe from '../CustomSwipe'
import { ThemeProvider } from '../ThemeProvider'

const LazyReloadPrompt = lazy(() => import('@/components/ReloadPrompt'))
const loadFeatures = () => import('./motionFeatures.js').then(res => res.default)

const useScrollRestoration = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    const timeout = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 50) // Adjust delay if needed

    return () => clearTimeout(timeout)
  }, [pathname])
}

const Root = () => {
  const errorToastIdRef = useRef()
  const errorToastKeyRef = useRef()
  useScrollRestoration()

  const onError = (error, key) => {
    errorToastIdRef.current = key
    console.log(error)
    errorToastKeyRef.current = toast.error(get(error, 'message', 'error'))
  }

  const onSuccess = (data, key) => {
    if (key !== errorToastKeyRef.current) {
      return
    }
    toast.dismiss(errorToastIdRef.current)
  }

  return (
    <ThemeProvider>
      <SWRConfig
        value={{
          // https://swr.vercel.app/docs/api
          revalidateOnFocus: false,
          keepPreviousData: true,
          errorRetryCount: 3,
          suspense: false,
          fetcher,
          onError,
          onSuccess
        }}
      >
        <HelmetProvider>
          <LazyMotion
            features={loadFeatures}
            strict
          >
            <Outlet />
          </LazyMotion>
        </HelmetProvider>
      </SWRConfig>
      <Toaster
        toastOptions={{
          className: '!bg-background/50 !text-foreground !border-foreground !border !backdrop-blur-md'
        }}
      />
      <CustomSwipe />
      <LazyReloadPrompt />
    </ThemeProvider>
  )
}

export default Root