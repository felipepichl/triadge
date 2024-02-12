import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="grid min-h-screen grid-cols-2">
      <div className="flex h-full flex-col justify-between border-r border-foreground/5 bg-muted p-10 text-muted-foreground"></div>
      <h1>Autenticação</h1>

      <div>
        <Outlet />
      </div>
    </div>
  )
}
