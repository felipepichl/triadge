import * as React from 'react'

import { NavLink } from './nav-link'

type NavMenuProps = {
  to: string
  icon: React.ElementType
  description: string
}

export function CustomNavlink({ to, icon: Icon, description }: NavMenuProps) {
  return (
    <NavLink to={to} className="flex items-center space-x-2 pl-2">
      <Icon className="h-4 w-4" />
      <span>{description}</span>
    </NavLink>
  )
}
