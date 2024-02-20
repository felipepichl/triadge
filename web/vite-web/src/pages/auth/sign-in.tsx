import { CreditCard, KeyRound } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const signInForm = z.object({
  register: z.string(),
  password: z.string(),
})

type SignInForm = z.infer<typeof signInForm>

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>()

  async function handleSign({ register, password }: SignInForm) {
    console.log(register, password)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast.success('Test Message')
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
