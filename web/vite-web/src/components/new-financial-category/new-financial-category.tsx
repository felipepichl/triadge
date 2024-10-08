import { zodResolver } from '@hookform/resolvers/zod'
import { CircleFadingPlus } from 'lucide-react'
import { FormEvent, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { apiCreateFinancialCategory } from '@/api/create-financial-category'
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
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

const createFinancialCategoryForm = z.object({
  description: z.string().min(1, { message: 'Campo obrigatório' }),
})

type CreateFinancialCategoryForm = z.infer<typeof createFinancialCategoryForm>

export function NewCategory() {
  const form = useForm<CreateFinancialCategoryForm>({
    resolver: zodResolver(createFinancialCategoryForm),
    defaultValues: {
      description: '',
    },
  })
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  function handleToggleSheet() {
    setIsSheetOpen((prevState) => !prevState)
  }

  const handleCreateNewTransactionCategory = useCallback(
    async ({ description }: CreateFinancialCategoryForm) => {
      try {
        await apiCreateFinancialCategory({ description })

        handleToggleSheet()
        form.reset()
        toast.success('Categoria salva com sucesso!')
      } catch (err) {
        toast.error('Erro ao salvar, tente novamente mais tarde!')
      }
    },
    [form],
  )

  return (
    <Sheet open={isSheetOpen} onOpenChange={handleToggleSheet}>
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
            onSubmit={(e: FormEvent<HTMLFormElement>) => {
              e.stopPropagation()
              form.handleSubmit(handleCreateNewTransactionCategory)(e)
            }}
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

            <Button type="submit" className="h-10 w-full">
              Salvar
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
