import * as React from 'react'
import { Link } from 'react-router-dom'

import { useMenu } from './menubar-provider'

type NavMenuProps = {
  to: string
  icon: React.ElementType
  description: string
}

export function CustomNavlink({ to, icon: Icon, description }: NavMenuProps) {
  const { closeMenu } = useMenu()

  return (
    <Link
      to={to}
      className="flex items-center space-x-2 pl-2"
      onClick={closeMenu}
    >
      <Icon className="h-4 w-4" />
      <span>{description}</span>
    </Link>
  )
}
