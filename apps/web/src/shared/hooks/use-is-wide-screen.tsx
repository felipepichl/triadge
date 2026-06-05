import { useEffect, useState } from 'react'

export function useIsWideScreen(breakpoint = 690) {
  const [isWideScreen, setIsWideScreen] = useState(
    window.innerWidth >= breakpoint,
  )

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth >= breakpoint)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [breakpoint])

  return isWideScreen
}
