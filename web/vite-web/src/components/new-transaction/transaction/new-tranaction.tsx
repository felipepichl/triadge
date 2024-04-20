import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react'
import { useCallback, useState } from 'react'

import {
  apiListAllTransactionCategory,
  TransactionCategory,
} from '@/api/list-all-transaction-category'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

import { Button } from '../../ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from '../../ui/drawer'
import { Input } from '../../ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select'
import { Separator } from '../../ui/separator'
import { NewCategory } from '../category/new-category'

export function NewTransaction() {
  const [transactionCategories, setTransactionCategories] =
    useState<TransactionCategory[]>()
  const [selectedValue, setSelectedValue] = useState('')

  const handleAllTransactionCategories = useCallback(async () => {
    const response = await apiListAllTransactionCategory()

    setTransactionCategories(response)
  }, [])

  const [price, setPrice] = useState<string>('')

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value

    // Remover todos os caracteres que não são dígitos
    inputValue = inputValue.replace(/\D/g, '')

    // Se o valor tiver mais de dois dígitos, considerar os dois últimos como centavos
    if (inputValue.length > 2) {
      const cents = inputValue.slice(-2)
      let reais = inputValue.slice(0, -2)

      // Adicionar ponto para milhares se houver mais de três dígitos
      if (reais.length >= 4) {
        reais = reais.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      }

      inputValue = `${reais},${cents}`
    }

    // Formatando o valor para exibir com "R$" fixo
    if (inputValue === '') {
      setPrice('')
    } else {
      setPrice(`R$ ${inputValue}`)
    }
  }

  return (
    <div className="flex justify-end pb-3">
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            className="w-40 min-w-40 rounded-sm bg-green-500 text-slate-100 hover:bg-green-700 hover:text-slate-100"
            onClick={handleAllTransactionCategories}
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

                <Input
                  className="h-10"
                  placeholder="Preço"
                  value={price}
                  onChange={handlePriceChange}
                />
                <div className="flex items-center justify-center gap-2">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {transactionCategories &&
                          transactionCategories.map((category) => (
                            <SelectItem
                              key={category._id}
                              value={category.description}
                            >
                              {category.description}
                            </SelectItem>
                          ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <NewCategory />
                </div>

                <RadioGroup className="mx-auto grid max-w-screen-md grid-cols-2 gap-2">
                  <Button
                    data-current={selectedValue}
                    className="h-12 w-full text-base data-[current=income]:bg-green-500 data-[current=income]:text-white sm:w-auto"
                    variant="outline"
                    type="button"
                    onClick={() => setSelectedValue('income')}
                  >
                    <RadioGroupItem value="income" asChild />
                    <ArrowDownCircle
                      className="mr-2"
                      color={`${selectedValue === 'income' ? '#fff' : '#00b37e'}`}
                    />
                    Entrada
                  </Button>

                  <Button
                    data-current={selectedValue}
                    className="h-12 w-full text-base data-[current=outcome]:bg-red-700 data-[current=outcome]:text-white sm:w-auto "
                    variant="outline"
                    type="button"
                    onClick={() => setSelectedValue('outcome')}
                  >
                    <RadioGroupItem value="outcome" asChild />
                    <ArrowUpCircle
                      className="mr-2"
                      color={`${selectedValue === 'outcome' ? '#fff' : '#ff0000'}`}
                    />
                    Saída
                  </Button>
                </RadioGroup>

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
