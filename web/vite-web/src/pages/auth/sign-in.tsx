import { CreditCard, KeyRound } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function SignIn() {
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
                Acompanhe suas vendas pelo painel parceiro!
              </p>
            </div>

            <form className="space-y-4">
              <div className="space-y-2">
                <Input
                  id="email"
                  type="email"
                  className="h-10"
                  placeholder="Matrícula"
                  icon={<CreditCard />}
                />

                <Input
                  id="email"
                  type="email"
                  className="h-10"
                  placeholder="Senha"
                  icon={<KeyRound />}
                />
              </div>

              <Button className="h-10 w-full" type="submit">
                <span className="font-semibold">Acessar Painel</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
