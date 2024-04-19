import { CircleFadingPlus } from 'lucide-react'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { apiCreateTransactionCategory } from '@/api/create-transaction-category'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

const createTransactionCategoryForm = z.object({
  description: z.string(),
})

type CreateTransactionCategoryForm = z.infer<
  typeof createTransactionCategoryForm
>

export function NewCategory() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<CreateTransactionCategoryForm>()

  const handleCreateNewTransactionCategory = useCallback(
    async ({ description }: CreateTransactionCategoryForm) => {
      try {
        await apiCreateTransactionCategory({ description })

        toast.success('Categoria salva com sucesso!')
      } catch (err) {
        toast.error('Erro ao salvar, tente novamente mais tarde!')
      }
    },
    [],
  )

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="flex min-w-10 items-center justify-center rounded-sm border-green-500 text-green-500 hover:border-green-700 hover:bg-green-700 hover:text-slate-100"
          size="icon"
        >
          <CircleFadingPlus className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Nova Categoria</SheetTitle>
        </SheetHeader>
        <form
          className="space-y-4 py-4"
          onSubmit={handleSubmit(handleCreateNewTransactionCategory)}
        >
          <Input placeholder="Descrição" {...register('description')} />
          <SheetClose asChild>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-10 w-full"
            >
              Salvar
            </Button>
          </SheetClose>
        </form>
      </SheetContent>
    </Sheet>
  )
}
