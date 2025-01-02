import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { useSubcategory } from '@/hooks/use-subcategory'

// import { useMonetaryMask } from '@/hooks/use-monetary-mask'
// import { useTransaction } from '@/hooks/use-transaction'
import { Button } from '../ui/button'
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '../ui/drawer'
import { Separator } from '../ui/separator'
import { AccountPayableFiled } from './account-payable-field/account-payable-field'
import { GenericForm } from './generic-form/generic-form'
import { SharedField } from './shared-field/shared-field'
import { TransactionField } from './transaction-field/transaction-field'

const baseFormSchema = z.object({
  description: z.string().min(1, { message: 'Campo obrigatório' }),
  amount: z.string().min(1, { message: 'Campo obrigatório' }),
  date: z.date(),
  financialCategoryId: z.string().min(1, { message: 'Selecione uma opção' }),
  subcategoryId: z.string().optional(),
})

const createAccountPayableForm = baseFormSchema.extend({
  installments: z.string().min(1, { message: 'Campo obrigatório' }),
  isFixed: z.boolean().optional(),
})

const createTransactionForm = baseFormSchema.extend({
  type: z.string().min(1, { message: 'Selecione uma opção' }),
})

type CreateAccountPayableForm = z.infer<typeof createAccountPayableForm>
type CreateTransactionForm = z.infer<typeof createTransactionForm>

type NewAccountTransactionProps = {
  title: string
  type: 'transaction' | 'accountPayable'
}

export function NewTransactionAccount({
  title,
  type,
}: NewAccountTransactionProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean | undefined>(
    undefined,
  )

  // const { rawValue } = useMonetaryMask()
  // const { createTransaction } = useTransaction()

  const { subcategories } = useSubcategory()

  const SubmitButton = () => (
    <>
      <Separator />

      <Button
        className="h-12 w-full font-bold hover:bg-green-700  hover:text-slate-100"
        type="submit"
        disabled={false}
      >
        Cadastrar
      </Button>
    </>
  )

  const accountPayableForm = useForm<CreateAccountPayableForm>({
    resolver: zodResolver(
      createAccountPayableForm.refine(
        (data) => {
          if (subcategories.length > 0 && !data.subcategoryId) {
            return false
          }
          return true
        },
        {
          message: 'Selecione uma opção',
          path: ['subcategoryId'],
        },
      ),
    ),
    defaultValues: {
      description: '',
      amount: '',
      date: new Date(),
      installments: '1',
      financialCategoryId: '',
      subcategoryId: '',
    },
  })

  const transactionForm = useForm<CreateTransactionForm>({
    resolver: zodResolver(
      createTransactionForm.refine(
        (data) => {
          if (subcategories.length > 0 && !data.subcategoryId) {
            return false
          }
          return true
        },
        {
          message: 'Selecione uma opção',
          path: ['subcategoryId'],
        },
      ),
    ),
    defaultValues: {
      description: '',
      amount: '',
      date: new Date(),
      type: '',
      financialCategoryId: '',
      subcategoryId: '',
    },
  })

  const handleToggleDrawer = useCallback(() => {
    // setIsDrawerOpen(undefined)
    setIsDrawerOpen((prevState) => !prevState)
  }, [])

  const handleCreateNewTransaction = useCallback(
    async ({
      description,
      amount,
      type,
      date,
      financialCategoryId,
      subcategoryId,
    }: CreateTransactionForm) => {
      try {
        // createTransaction({
        //   description,
        //   amount: String(rawValue),
        //   type,
        //   date,
        //   financialCategoryId,
        //   subcategoryId,
        // })

        console.log(
          'Transaction',
          description,
          amount,
          date,
          type,
          financialCategoryId,
          subcategoryId,
        )

        handleToggleDrawer()
        transactionForm.reset()
        toast.success('Transação salva com sucesso!')
      } catch (err) {
        console.log(err)
        toast.error('Erro ao salvar, tente novamente mais tarde!')
      }
    },
    [transactionForm, handleToggleDrawer],
  )

  const handleCreateNewAccountPayable = useCallback(
    async ({
      description,
      amount,
      date,
      installments,
      isFixed,
      financialCategoryId,
      subcategoryId,
    }: CreateAccountPayableForm) => {
      try {
        console.log(
          'Account Payable',
          description,
          amount,
          date,
          installments,
          financialCategoryId,
          subcategoryId,
        )

        if (isFixed) {
          console.log('Eh uma conta fixa')
        }
        handleToggleDrawer()
        accountPayableForm.reset()
        toast.success('Conta a Pagr salva com sucesso!')
      } catch (err) {
        console.log(err)
        toast.error('Erro ao salvar, tente novamente mais tarde!')
      }
    },
    [accountPayableForm, handleToggleDrawer],
  )

  return (
    <div className="flex justify-end pb-3">
      <Drawer onOpenChange={handleToggleDrawer} open={isDrawerOpen}>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            className="w-48 min-w-48 rounded-sm bg-green-500 text-slate-100 hover:bg-green-700 hover:text-slate-100"
          >
            {title}
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mt-3 p-4">
            <DrawerTitle>{title}</DrawerTitle>
            {type === 'accountPayable' ? (
              <GenericForm
                onSubmit={handleCreateNewAccountPayable}
                form={accountPayableForm}
                fields={
                  <>
                    <SharedField />
                    <AccountPayableFiled />
                    <SubmitButton />
                  </>
                }
              />
            ) : (
              <GenericForm
                onSubmit={handleCreateNewTransaction}
                form={transactionForm}
                fields={
                  <>
                    <SharedField />
                    <TransactionField />
                    <SubmitButton />
                  </>
                }
              />
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
