import { zodResolver } from '@hookform/resolvers/zod'
import { CircleFadingPlus } from 'lucide-react'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { apiCreateTransactionCategory } from '@/api/create-transaction-category'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
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
  description: z.string().min(1, { message: 'Campo obrigatório' }),
})

type CreateTransactionCategoryForm = z.infer<
  typeof createTransactionCategoryForm
>

export function NewCategory() {
  const form = useForm<CreateTransactionCategoryForm>({
    resolver: zodResolver(createTransactionCategoryForm),
    defaultValues: {
      description: '',
    },
  })

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
        <Form {...form}>
          <form
            className="space-y-4 py-4"
            onSubmit={form.handleSubmit(handleCreateNewTransactionCategory)}
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Descrição"
                      {...field}
                      {...form.register('description')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SheetClose asChild>
              <Button
                type="submit"
                // disabled={form.isSubmitting}
                className="h-10 w-full"
              >
                Salvar
              </Button>
            </SheetClose>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
