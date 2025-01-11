import { useEffect, useState } from 'react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useAuth } from '@/hooks/use-auth'

export function AutomaticSignoutAlert() {
  const { isSignOut, signOut } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const [countdown, setCountdown] = useState(7)

  const handleClose = () => {
    setIsOpen(false)
    signOut(true)
  }

  useEffect(() => {
    if (isSignOut) {
      setIsOpen(true)

      const interval = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : prev))
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [isSignOut])

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sua sessao expirou</AlertDialogTitle>
          <AlertDialogDescription>
            Você será deslogado automaticamente em {countdown} segundos.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleClose}>
            Acessar o Painel
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
