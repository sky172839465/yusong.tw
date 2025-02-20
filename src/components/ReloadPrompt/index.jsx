import { delay } from 'lodash-es'
import { Download, MousePointerClick, X } from 'lucide-react'
import { useState } from 'react'
import { useRegisterSW } from 'virtual:pwa-register/react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import useI18N, { LANG } from '@/hooks/useI18N'

const SEC = 1000
const INTERVAL_MS = 10 * 60 * SEC

const i18nMapping = {
  [LANG.EN]: {
    UPDATE_AVAILABLE: 'Update Available',
    CLICK_TO_UPDATE: 'New content available, click to update.',
    DOWNING: 'Downloading',
    PLZ_WAIT_DOWNLOAD: 'Please waiting for new content downloaded.'
  },
  [LANG.ZH_TW]: {
    UPDATE_AVAILABLE: '發現可用更新',
    CLICK_TO_UPDATE: '網站有更新內容，點我更新網站的內容。',
    DOWNING: '下載中',
    PLZ_WAIT_DOWNLOAD: '更新內容中請稍等一下。'
  }
}

const ReloadPrompt = () => {
  const { label } = useI18N(i18nMapping)
  const [isUpdating, setIsUpdating] = useState(false)
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker
  } = useRegisterSW({
    onRegistered(r) {
      if (!r) {
        return
      }

      // on page load check new sw, if exist trigger upload & refresh flow
      r.update().then(() => updateServiceWorker(true))
      setInterval(() => r.update(), INTERVAL_MS)
    },
    onRegisterError(error) {
      console.log('SW registration error', error)
    }
  })

  const onClose = () => {
    setNeedRefresh(false)
  }

  const opUpdate = () => {
    if (!needRefresh) {
      return
    }

    setIsUpdating(true)
    updateServiceWorker(true)
    delay(() => window.location.reload(), SEC * 10)
  }

  return (
    needRefresh && (
      <div className='fixed bottom-4 left-1/2 z-50 w-full max-w-sm -translate-x-1/2 pwa:bottom-8'>
        <Alert
          className={`
            flex items-center justify-between gap-2
            rounded-xl border border-foreground bg-background/50 p-4 text-foreground shadow-xl backdrop-blur-md
            ${needRefresh && 'cursor-pointer'}
          `}
        >
          {!isUpdating && (
            <>
              <div onClick={opUpdate}>
                <AlertTitle className='flex items-center gap-2'>
                  <MousePointerClick className='size-5' />
                  <span>
                    {label.UPDATE_AVAILABLE}
                  </span>
                </AlertTitle>
                <AlertDescription>
                  {label.CLICK_TO_UPDATE}
                </AlertDescription>
              </div>
              <div className='flex'>
                <Button size='icon' variant='ghost' onClick={onClose}>
                  <X className='size-4' />
                </Button>
              </div>
            </>
          )}
          {isUpdating && (
            <div>
              <AlertTitle className='flex items-center gap-2'>
                <Download className='size-5' />
                <span>
                  {label.DOWNING}
                </span>
              </AlertTitle>
              <AlertDescription>
                {label.PLZ_WAIT_DOWNLOAD.split(' ').map((word, index) => {
                  return (
                    <span
                      key={index}
                      className='animate-pulse font-medium'
                    >
                      {`${word} `}
                    </span>
                  )
                })}
              </AlertDescription>
            </div>
          )}
        </Alert>
      </div>
    )
  )
}

export default ReloadPrompt
