import { ArrowDownCircle, ArrowUpCircle, CircleFadingPlus } from 'lucide-react'

import { Button } from '../ui/button'
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '../ui/drawer'
import { Input } from '../ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Separator } from '../ui/separator'

export function NewTransaction() {
  return (
    <div className="flex justify-end pb-3">
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            className="w-40 min-w-40 rounded-sm bg-green-500 text-slate-100 hover:bg-green-700 hover:text-slate-100"
          >
            Nova transação
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mt-3 p-4">
            <DrawerTitle>Nova Transação</DrawerTitle>

            <form className="mt-3 space-y-4">
              <div className="space-y-2">
                <Input className="h-10" placeholder="Descrição" />

                <Input className="h-10" placeholder="Preço" />
                <div className="flex items-center justify-center gap-2">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="sell">Venda</SelectItem>
                        <SelectItem value="card">Cartão de Crédito</SelectItem>
                        <SelectItem value="work">Empresa Filial 01</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <Button
                    variant="outline"
                    className={
                      'flex min-w-10 items-center justify-center rounded-sm border-green-500 text-green-500 hover:border-green-700 hover:bg-green-700 hover:text-slate-100'
                    }
                    size="icon"
                  >
                    <CircleFadingPlus className="h-5 w-5" />
                  </Button>
                </div>

                <div className="mx-auto grid max-w-screen-md grid-cols-2 gap-2">
                  <Button
                    className="h-12 w-full text-base sm:w-auto"
                    variant="outline"
                  >
                    <ArrowDownCircle className="mr-2" color="#00b37e" />
                    Entrada
                  </Button>
                  <Button
                    className="h-12 w-full text-base sm:w-auto"
                    variant="outline"
                  >
                    <ArrowUpCircle className="mr-2" color="#ff0000" />
                    Saída
                  </Button>
                </div>

                <Separator />

                <Button className="h-12 w-full bg-green-500 font-bold hover:border-green-700 hover:bg-green-700 hover:text-slate-100">
                  Cadastrar
                </Button>
              </div>
            </form>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
