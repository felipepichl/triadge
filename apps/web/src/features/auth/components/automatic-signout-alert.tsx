import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'

import { useAuth } from '@/features/auth/hooks/use-auth'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/components/ui/alert-dialog'

export function AutomaticSignoutAlert() {
  const { isSessionExpiring, isSignOut, signOut, renewSession } = useAuth()
  const [countdown, setCountdown] = useState(7)
  const [isRenewing, setIsRenewing] = useState(false)

  // Proactive: session is about to expire
  const handleContinue = async () => {
    if (isRenewing) return
    setIsRenewing(true)
    try {
      await renewSession()
    } finally {
      setIsRenewing(false)
    }
  }

  const handleLogout = () => {
    signOut(true)
  }

  // Reactive: session already expired (401 fallback)
  useEffect(() => {
    if (!isSignOut) {
      setCountdown(7)
      return
    }

    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : prev))
    }, 1000)

    return () => clearInterval(interval)
  }, [isSignOut])

  // Proactive alert: "Your session is about to expire"
  if (isSessionExpiring) {
    return (
      <AlertDialog open onOpenChange={() => {}}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Sua sessão está prestes a expirar
            </AlertDialogTitle>
            <AlertDialogDescription>
              Deseja continuar conectado?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleLogout} className="w-40">
              Sair
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleContinue}
              disabled={isRenewing}
              className="w-40"
            >
              {isRenewing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Renovando...
                </>
              ) : (
                'Continuar'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }

  // Reactive alert: session already expired
  if (isSignOut) {
    return (
      <AlertDialog open onOpenChange={() => {}}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sua sessão expirou</AlertDialogTitle>
            <AlertDialogDescription>
              Você será deslogado automaticamente em {countdown} segundos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleLogout}>
              Acessar o Painel
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }

  return null
}
