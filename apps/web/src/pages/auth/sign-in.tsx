import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, KeyRound, Loader2, Mail } from 'lucide-react'
import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { useAuth } from '@/hooks/use-auth'

const signInForm = z.object({
  register: z.string().min(1, { message: 'Campo obrigatório' }),
  password: z.string().min(1, { message: 'Campo obrigatório' }),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const [showPassword, setShowPassword] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const form = useForm<SignInForm>({
    resolver: zodResolver(signInForm),
    defaultValues: {
      register: '',
      password: '',
    },
  })

  const { signIn } = useAuth()

  const navigate = useNavigate()

  const handleTogglePassword = () => {
    setShowPassword(!showPassword)
  }

  async function handleSign({ register, password }: SignInForm) {
    setIsSubmitting(true)
    try {
      await signIn({ email: register, password })

      navigate('/')
    } catch (err) {
      toast.error('Verifique suas credenciais')
    } finally {
      setIsSubmitting(false)
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

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSign)}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="register"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 transform text-muted-foreground">
                              <Mail size={18} />
                            </span>
                            <input
                              type="email"
                              className="flex h-10 w-full rounded-md border border-input bg-background py-2 pl-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              placeholder="Email"
                              {...field}
                              {...form.register('register')}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 transform text-muted-foreground">
                              <KeyRound size={18} />
                            </span>
                            <input
                              type={showPassword ? 'text' : 'password'}
                              className="flex h-10 w-full rounded-md border border-input bg-background py-2 pl-10 pr-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              placeholder="Senha"
                              {...field}
                              {...form.register('password')}
                            />
                            <button
                              type="button"
                              onClick={handleTogglePassword}
                              className="absolute right-3 top-1/2 -translate-y-1/2 transform text-muted-foreground hover:text-foreground"
                            >
                              {showPassword ? (
                                <EyeOff size={18} />
                              ) : (
                                <Eye size={18} />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  disabled={isSubmitting}
                  className="h-10 w-full"
                  type="submit"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <span className="font-semibold">Acessando...</span>
                    </>
                  ) : (
                    <span className="font-semibold">Acessar Painel</span>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}
