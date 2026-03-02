import { useEffect, useState } from 'react'

import { NotFound } from '@/components/not-found'

import { GenericBarChartProps } from './dtos/generic-bar-chart-dto'
import { Horizontal } from './horizontal'
import { Vertical } from './vertical'

export function GenericBarChart({ data }: GenericBarChartProps) {
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 690)
  const [internalData, setInternalData] = useState<typeof data>([])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setInternalData(data)
    }, 500)

    return () => clearTimeout(timeout)
  }, [data])

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth >= 690)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      {internalData.length === 0 ? (
        <NotFound />
      ) : isWideScreen ? (
        <Vertical data={internalData} />
      ) : (
        <Horizontal data={internalData} />
      )}
    </>
  )
}
