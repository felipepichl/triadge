import { useEffect, useState } from 'react'

import { NotFound } from '@/components/not-found'
import { useIsWideScreen } from '@/hooks/use-is-wide-screen'

import { GenericBarChartProps } from './dtos/generic-bar-chart-dto'
import { Horizontal } from './horizontal'
import { Vertical } from './vertical'

export function GenericBarChart({ data }: GenericBarChartProps) {
  const isWideScreen = useIsWideScreen()
  const [internalData, setInternalData] = useState<typeof data>([])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setInternalData(data)
    }, 500)

    return () => clearTimeout(timeout)
  }, [data])

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
