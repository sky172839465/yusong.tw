import { lazy, Suspense } from 'react'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

// import Root from '@/components/Root/index.jsx'
import SkeletonHome from '@/components/SkeletonHome/index.jsx'

import ErrorElement from './ErrorElement.jsx'
import getRoutes from './getRoutes.js'
// import loader from './index.loader'

const LazyArticle = lazy(() => import('@/components/Article/index.jsx'))
const LazyRoot = lazy(() => import('@/components/Root/index.jsx'))
const LazySkeletonArticle = lazy(() => import('@/components/SkeletonArticle/index.jsx'))
const LazyMeta = lazy(() => import('@/components/Meta'))

const DefaultLayout = (props) => props.children

const withErrorElement = (routes) => routes.map((item) => {
  const {
    element: Comp,
    isMarkdown,
    layout: Layout = DefaultLayout,
    meta,
    ...route
  } = item
  return {
    ...route,
    element: (
      <Suspense
        fallback={(
          <SkeletonHome className='fixed top-0 z-0' />
        )}
      >
        <Layout>
          {isMarkdown && (
            <Suspense fallback={<LazySkeletonArticle />}>
              <LazyArticle {...item} />
            </Suspense>
          )}
          {!isMarkdown && (
            <>
              <Comp />
              <LazyMeta fetchMetaData={meta} />
            </>
          )}
        </Layout>
      </Suspense>
    ),
    errorElement: <ErrorElement />
  }
})

const routes = getRoutes()

const Router = () => {
  const totalRoutes = [
    {
      element: (
        <Suspense
          fallback={(
            <SkeletonHome className='fixed top-0 z-0' />
          )}
        >
          <LazyRoot />
        </Suspense>
      ),
      // loader,
      errorElement: <ErrorElement />,
      children: [
        ...withErrorElement(routes),
        {
          path: '/test',
          element: <SkeletonHome />
        },
        {
          path: '*',
          element: <ErrorElement />
        }
      ]
    }
  ]

  const router = createBrowserRouter(totalRoutes)
  return (
    <RouterProvider
      router={router}
      fallbackElement={(
        <SkeletonHome className='fixed top-0 z-0' />
      )}
    />
  )
}

export default Router
