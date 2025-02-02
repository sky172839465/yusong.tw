import './index.css'

import { tryit } from 'radash'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import Router from '@/components/Router'

if ('serviceWorker' in navigator) {
  const registerSW = async () => {
    const [error, result] = await tryit(
      () => navigator.serviceWorker.register('/sw.js')
    )()
    if (error) {
      console.log('Service Worker registration failed:', error)
      return
    }

    console.log('Service Worker registered', result)
  }
  registerSW()

  navigator.serviceWorker.addEventListener('message', (event) => {
    if (event.data.action !== 'refresh') {
      return
    }

    console.log('refresh from message')
    window.location.reload()
  })
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router />
  </StrictMode>
)
