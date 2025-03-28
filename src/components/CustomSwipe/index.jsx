import { ArrowLeft, ArrowRight } from 'lucide-react'

import useSwipeHandler from '../../hooks/useSwipeHandler'

const ICONS = [ArrowLeft, ArrowRight]
const DEFAULT_X_POSITION = [-8, 10]

const CustomSwipe = (props) => {
  const { setLoading } = props
  const {
    swiping,
    isSwipeFromLeft,
    isSwipeFromRight,
    opacityPercent,
    distanceInPercent
  } = useSwipeHandler(setLoading)

  return (
    <div
      className={`
        fixed left-0 top-0
        flex h-dvh w-dvw
        flex-row items-center justify-between px-6
        transition-all duration-0
        ${swiping ? 'z-50' : '-z-50'}
      `}
    >
      {ICONS.map((Icon, index) => {
        const isLeftArrow = isSwipeFromLeft && swiping && index === 0
        const isRightArrow = isSwipeFromRight && swiping && index === 1
        const defaultXPosition = DEFAULT_X_POSITION[index]
        return (
          <div
            key={index}
            className='rounded-full border bg-foreground p-4 text-background'
            style={{
              opacity: (
                (isLeftArrow && opacityPercent) ||
                (isRightArrow && opacityPercent) ||
                0
              ),
              transform: `translateX(${(
                isLeftArrow && (defaultXPosition + distanceInPercent * defaultXPosition * -1) ||
                isRightArrow && (defaultXPosition + distanceInPercent * defaultXPosition) ||
                0
              )}dvw)`
            }}
          >
            <Icon className='size-[1.2rem]' />
          </div>
        )
      })}
    </div>
  )
}

export default CustomSwipe
