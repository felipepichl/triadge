import { zodResolver } from '@hookform/resolvers/zod'
import { CircleFadingPlus } from 'lucide-react'
import { FormEvent, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { apiCreateFinancialCategory } from '@/api/create-financial-category'
import { apiCreateSubcategory } from '@/api/create-subcategory'
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

const createFinancialCategoryOrSubcategoryForm = z.object({
  description: z.string().min(1, { message: 'Campo obrigatório' }),
  // parentCategoryId: z.string().optional(),
})

type CreateFinancialCategoryOrSubcategoryForm = z.infer<
  typeof createFinancialCategoryOrSubcategoryForm
>

type NewFinancialCategoryOrSubcategoryProps = {
  title: string
  type: 'financialCategory' | 'subcategory'
  parentCategoryId?: string
}

export function NewFinancialCategoryOrSubcategory({
  title,
  type,
  parentCategoryId,
}: NewFinancialCategoryOrSubcategoryProps) {
  const form = useForm<CreateFinancialCategoryOrSubcategoryForm>({
    resolver: zodResolver(createFinancialCategoryOrSubcategoryForm),
    defaultValues: {
      description: '',
    },
  })
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  function handleToggleSheet() {
    setIsSheetOpen((prevState) => !prevState)
  }

  const handleCreateFinancialCategoryOrSubcategory = useCallback(
    async ({ description }: CreateFinancialCategoryOrSubcategoryForm) => {
      const actionMap = {
        financialCategory: () => apiCreateFinancialCategory({ description }),
        subcategory: () => {
          if (parentCategoryId) {
            return apiCreateSubcategory({ description, parentCategoryId })
          }
        },
      }

      try {
        const action = actionMap[type]
        if (action) {
          await action()
        }

        handleToggleSheet()
        form.reset()

        const entityType =
          type === 'financialCategory' ? 'Categoria' : 'Subcategoria'

        toast.success(`${entityType} salva com sucesso!`)
      } catch (err) {
        toast.error('Erro ao salvar, tente novamente mais tarde!')
      }
    },
    [form, type, parentCategoryId],
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
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form
            className="space-y-4 py-4"
            onSubmit={(e: FormEvent<HTMLFormElement>) => {
              e.stopPropagation()
              form.handleSubmit(handleCreateFinancialCategoryOrSubcategory)(e)
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
