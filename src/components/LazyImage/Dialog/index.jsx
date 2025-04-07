import { get, isUndefined } from 'lodash-es'
import { memo, useState } from 'react'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import useI18N, { LANG } from '@/hooks/useI18N'
import getFileUrl from '@/utils/getFileUrl'

import LazyImage from '..'

const i18nMapping = {
  [LANG.EN]: {
    PREVIEW: 'Preview'
  },
  [LANG.ZH_TW]: {
    PREVIEW: '預覽'
  }
}

const LazyImagePreview = (props) => {
  const { label } = useI18N(i18nMapping)
  const [open, setOpen] = useState(false)
  const { className, imageData, alt, ...restProps } = props

  if (isUndefined(imageData)) {
    return (
      <LazyImage
        className={className}
        imageData={imageData}
        alt={alt}
        {...restProps}
      />
    )
  }


  const { webp, width, height } = get(imageData, 'original', {})
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className='w-full cursor-pointer'>
        <LazyImage
          className={`${className || ''} transition md:hover:scale-105`}
          imageData={imageData}
          alt={alt}
          {...restProps}
        />
      </DialogTrigger>
      <DialogContent className='max-w-[94dvw] border-none bg-transparent p-0 text-white shadow-none md:max-w-[80dvw]'>
        <DialogHeader>
          <DialogTitle className='text-white'>
            {label.PREVIEW}
          </DialogTitle>
          <DialogDescription className='text-white/80'>
            {alt}
          </DialogDescription>
        </DialogHeader>
        <div
          className={`cursor-pointer bg-secondary ${className || ''}`}
          onClick={() => setOpen(false)}
        >
          <LazyImage
            src={getFileUrl(`/${webp}`)}
            width={width}
            height={height}
            alt={alt}
            className={`${className || ''} max-h-[88dvh] md:max-h-[90dvh]`}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default memo(LazyImagePreview)
