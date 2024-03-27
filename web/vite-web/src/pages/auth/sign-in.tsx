import { CreditCard, KeyRound } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/contexts/auth-context'

const signInForm = z.object({
  register: z.string(),
  password: z.string(),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>()

  const { signIn } = useAuth()

  const navigate = useNavigate()

  async function handleSign({ register, password }: SignInForm) {
    try {
      await signIn({ email: register, password })

      navigate('/')
    } catch (err) {
      toast.error('Verifique suas credenciais')
    }
  }
  return (
    <>
      <Helmet title="Login" />
      <div className="p-8">
        <div className="flex w-full justify-center">
          <div className="flex w-full flex-col justify-center gap-6 md:w-[350px]">
            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tighter">
                Acessar Painel
              </h1>
              <p className="text-sm text-muted-foreground">
                Acesse com suas credenciais
              </p>
            </div>

            <form className="space-y-4">
              <div className="space-y-2">
                <Input
                  className="h-10"
                  placeholder="Matrícula"
                  icon={<CreditCard />}
                  {...register('register')}
                />

                <Input
                  className="h-10"
                  placeholder="Senha"
                  icon={<KeyRound />}
                  type="password"
                  {...register('password')}
                />
              </div>

              <Button
                onClick={handleSubmit(handleSign)}
                disabled={isSubmitting}
                className="h-10 w-full"
                type="submit"
              >
                <span className="font-semibold">Acessar Painel</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
