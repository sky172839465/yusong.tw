import { flow, get, join, last, map, pick } from 'lodash-es'

import getFileUrl from '@/lib/getFileUrl'

const SIZE_QUERY = [
  '(max-width: 600px) ',
  '(max-width: 1024px) ',
  ''
]

// const SIZE_QUERY = [
//   '(max-width: 600px) 100vw',
//   '(max-width: 1024px) 50vw',
//   '33vw'
// ]

const getRwdImageAttributes = (imageData) => {
  if (!imageData) {
    const dimensions = { width: 1200, height: 675 }
    return dimensions
  }

  const imageSizes = get(imageData, 'sizes', [])
  const largeImage = last(imageSizes)
  const src = getFileUrl(`/${get(largeImage, 'path')}`)
  const srcSet = flow(
    () => map(imageSizes, ({ path, width }) => `${getFileUrl(`/${path}`)} ${width}w`),
    srcSetList => join(srcSetList, ', ')
  )()
  const sizes = flow(
    () => map(imageSizes, ({ width }, index) => `${SIZE_QUERY[index]}${width}px`),
    // () => map(imageSizes, (_, index) => SIZE_QUERY[index]),
    (sizeList) => join(sizeList, ', ')
  )()
  const dimensions = pick(largeImage, ['width', 'height'])
  return { src, srcSet, sizes, ...dimensions }
}

export default getRwdImageAttributes
