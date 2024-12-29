import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Form } from '@/components/ui/form'
import { useFinancialCategoryAndSubcategory } from '@/hooks/use-financial-category-and-subcategory'

// import { useMonetaryMask } from '@/hooks/use-monetary-mask'
// import { useTransaction } from '@/hooks/use-transaction'
import { Button } from '../ui/button'
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '../ui/drawer'
import { Separator } from '../ui/separator'
import { AccountPayableFiled } from './account-payable/account-payable-field'
import { SharedField } from './shared-field/shared-field'
import { TransactionField } from './transaction/transaction-field'

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

  // const { rawValue } = useMonetaryMask()
  // const { createTransaction } = useTransaction()
  const { subcategories } = useFinancialCategoryAndSubcategory()

  const baseFormSchema = z.object({
    description: z.string().min(1, { message: 'Campo obrigatório' }),
    amount: z.string().min(1, { message: 'Campo obrigatório' }),
    date: z.date(),
    financialCategoryId: z.string().min(1, { message: 'Selecione uma opção' }),
    subcategoryId: z.string().optional(),
  })

  const createAccountPayableForm = baseFormSchema
    .extend({
      installments: z.string().min(1, { message: 'Campo obrigatório' }),
    })
    .refine(
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
    )

  type CreateAccountPayableForm = z.infer<typeof createAccountPayableForm>

  const accountPayableForm = useForm<CreateAccountPayableForm>({
    resolver: zodResolver(createAccountPayableForm),
    defaultValues: {
      description: '',
      amount: '',
      date: new Date(),
      installments: '1',
      financialCategoryId: '',
      subcategoryId: '',
    },
  })

  const createTransactionForm = baseFormSchema
    .extend({
      type: z.string().min(1, { message: 'Selecione uma opção' }),
    })
    .refine(
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
    )

  type CreateTransactionForm = z.infer<typeof createTransactionForm>

  const transactionForm = useForm<CreateTransactionForm>({
    resolver: zodResolver(createTransactionForm),
    defaultValues: {
      description: '',
      amount: '',
      date: new Date(),
      type: '',
      financialCategoryId: '',
      subcategoryId: '',
    },
  })

  function handleToggleDrawer() {
    setIsDrawerOpen(undefined)
  }

  const cleanFileds = useCallback(() => {
    setIsDrawerOpen(false)
    transactionForm.reset()
  }, [transactionForm])

  const handleCreateNewTransaction = useCallback(
    async ({
      description,
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
          date,
          type,
          financialCategoryId,
          subcategoryId,
        )

        cleanFileds()
        toast.success('Transação salva com sucesso!')
      } catch (err) {
        console.log(err)
        toast.error('Erro ao salvar, tente novamente mais tarde!')
      }
    },
    [cleanFileds],
  )

  const handleCreateNewAccountPayable = useCallback(
    async ({
      description,
      date,
      installments,
      financialCategoryId,
      subcategoryId,
    }: CreateAccountPayableForm) => {
      try {
        console.log(
          'Account Payable',
          description,
          date,
          installments,
          financialCategoryId,
          subcategoryId,
        )

        toast.success('Conta a Pagr salva com sucesso!')
      } catch (err) {
        console.log(err)
        toast.error('Erro ao salvar, tente novamente mais tarde!')
      }
    },
    [],
  )

  useEffect(() => {
    if (subcategories.length > 0) {
      transactionForm.clearErrors('subcategoryId')
    }
  }, [subcategories, transactionForm])

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
              <Form {...accountPayableForm}>
                <form
                  className="mt-3 space-y-4"
                  onSubmit={accountPayableForm.handleSubmit(
                    handleCreateNewAccountPayable,
                  )}
                >
                  <div className="space-y-2">
                    <SharedField
                      control={accountPayableForm.control}
                      register={accountPayableForm.register}
                    />

                    <AccountPayableFiled />

                    <SubmitButton />
                  </div>
                </form>
              </Form>
            ) : (
              <Form {...transactionForm}>
                <form
                  className="mt-3 space-y-4"
                  onSubmit={transactionForm.handleSubmit(
                    handleCreateNewTransaction,
                  )}
                >
                  <div className="space-y-2">
                    <SharedField
                      control={transactionForm.control}
                      register={transactionForm.register}
                    />

                    <TransactionField
                      control={transactionForm.control}
                      name="type"
                    />

                    <SubmitButton />
                  </div>
                </form>
              </Form>
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
