import * as React from 'react'
import { Link, LinkProps } from 'react-router-dom'

type NavMenuProps = LinkProps & {
  to: string
  icon: React.ElementType
  description: string
}

export function CustomNavlink({
  to,
  icon: Icon,
  description,
  ...props
}: NavMenuProps) {
  return (
    <Link to={to} className="flex items-center space-x-2 pl-2" {...props}>
      <Icon className="h-4 w-4" />
      <span>{description}</span>
    </Link>
  )
}
