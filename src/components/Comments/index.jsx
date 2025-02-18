import { ChevronsDownUp, ChevronsUpDown } from 'lucide-react'
import { lazy, Suspense } from 'react'
import { useLocalStorage } from 'usehooks-ts'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import useTheme from '@/hooks/useTheme'

import FadeIn from '../FadeIn'

const COMMENTS_VISIBLE_KEY = 'COMMENTS_VISIBLE_KEY'

const LazyGiscus = lazy(() => import('@giscus/react'))

const GiscusSkeleton = () => {
  return (
    <Skeleton className='h-[30dvh] w-full' />
  )
}

const Comments = () => {
  const { isDarkMode } = useTheme()
  const [visible, setVisible] = useLocalStorage(COMMENTS_VISIBLE_KEY, false)

  const toggleVisible = () => setVisible(!visible)

  return (
    <>
      <Button className='my-4 p-6' onClick={toggleVisible}>
        {visible && (
          <>
            <ChevronsDownUp className='size-4' />
            隱藏留言
          </>
        )}
        {!visible && (
          <>
            <ChevronsUpDown className='size-4' />
            顯示留言
          </>
        )}
        
      </Button>
      {visible && (
        <Suspense fallback={<GiscusSkeleton />}>
          <FadeIn>
            <LazyGiscus
              id='comments'
              repo='sky172839465/yusong.tw'
              repoId='R_kgDONva8Tw'
              category='Announcements'
              categoryId='DIC_kwDONva8T84Cmdvk'
              mapping='pathname'
              reactionsEnabled='1'
              emitMetadata='0'
              inputPosition='top'
              theme={isDarkMode ? 'dark' : 'light'}
              lang='zh-TW'
              loading='lazy'
            />
          </FadeIn>
        </Suspense>
      )}
    </>
  )
}

export default Comments
