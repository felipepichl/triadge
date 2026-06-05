import { zodResolver } from '@hookform/resolvers/zod'
import { CircleFadingPlus } from 'lucide-react'
import { FormEvent, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { useCreateFinancialCategory } from '@/features/financial-categories/hooks/use-create-financial-category'
import { useCreateSubcategory } from '@/features/financial-categories/hooks/use-create-subcategory'
import { Button } from '@/shared/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/shared/components/ui/form'
import { Input } from '@/shared/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/components/ui/sheet'

const createFinancialCategoryOrSubcategoryForm = z.object({
  description: z.string().min(1, { message: 'Campo obrigatório' }),
})

type CreateFinancialCategoryOrSubcategoryForm = z.infer<
  typeof createFinancialCategoryOrSubcategoryForm
>

type NewFinancialCategoryOrSubcategoryProps = {
  title: string
  type: 'financialCategory' | 'subcategory'
  parentCategoryId?: string
  disable?: boolean
}

export function NewFinancialCategoryOrSubcategory({
  title,
  type,
  parentCategoryId,
  disable,
}: NewFinancialCategoryOrSubcategoryProps) {
  const form = useForm<CreateFinancialCategoryOrSubcategoryForm>({
    resolver: zodResolver(createFinancialCategoryOrSubcategoryForm),
    defaultValues: {
      description: '',
    },
  })
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const createFinancialCategory = useCreateFinancialCategory()
  const createSubcategory = useCreateSubcategory()

  function handleToggleSheet() {
    setIsSheetOpen((prevState) => !prevState)
  }

  const handleCreateFinancialCategoryOrSubcategory = useCallback(
    async ({ description }: CreateFinancialCategoryOrSubcategoryForm) => {
      try {
        if (type === 'financialCategory') {
          await createFinancialCategory.mutateAsync(description)
        } else if (parentCategoryId) {
          await createSubcategory.mutateAsync({
            description,
            parentCategoryId,
          })
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
    [form, type, parentCategoryId, createFinancialCategory, createSubcategory],
  )

  return (
    <Sheet open={isSheetOpen} onOpenChange={handleToggleSheet}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="flex min-w-10 items-center justify-center rounded-sm border-green-500 text-green-500 hover:border-green-700 hover:bg-green-700 hover:text-slate-100"
          size="icon"
          disabled={disable}
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
