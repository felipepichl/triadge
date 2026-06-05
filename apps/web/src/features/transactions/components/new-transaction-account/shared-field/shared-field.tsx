import { Popover } from '@radix-ui/react-popover'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { ChangeEvent, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { NewFinancialCategoryOrSubcategory } from '@/features/financial-categories/components/new-financial-category-or-subcategory'
import { Button } from '@/shared/components/ui/button'
import { Calendar } from '@/shared/components/ui/calendar'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/shared/components/ui/form'
import { Input } from '@/shared/components/ui/input'
import { PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover'
import { useFinancialCategories } from '@/features/financial-categories/hooks/use-financial-categories'
import { useSubcategories } from '@/features/financial-categories/hooks/use-subcategories'
import { useMonetaryMask } from '@/shared/hooks/use-monetary-mask'

import { getFieldPaths } from '../@types/field-paths'
import { CategorySelect } from './category-select'

export function SharedField() {
  const [parentCategoryId, setParentCategoryId] = useState<string>('')

  const { formattedValue, handleMaskChange } = useMonetaryMask()
  const { data: financialCategories = [] } = useFinancialCategories()
  const { data: subcategories = [] } = useSubcategories(parentCategoryId)

  const form = useFormContext()
  const { description, amount, date, financialCategoryId, subcategoryId } =
    getFieldPaths()

  return (
    <>
      <FormField
        control={form.control}
        name={description}
        render={() => (
          <FormItem>
            <FormControl>
              <Input placeholder="Descrição" {...form.register(description)} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={amount}
        render={() => (
          <FormItem>
            <FormControl>
              <Input
                className="h-10"
                placeholder="Valor"
                value={formattedValue}
                {...form.register(amount, {
                  onChange: (e: ChangeEvent<HTMLInputElement>) => {
                    handleMaskChange(e)
                  },
                })}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={date}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value ? (
                      format(field.value, 'PPP')
                    ) : (
                      <span>Selecione uma data</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    initialFocus
                    selected={field.value}
                    onSelect={(date) => field.onChange(date)}
                  />
                </PopoverContent>
              </Popover>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex justify-center gap-2">
        <CategorySelect
          name={financialCategoryId}
          options={financialCategories}
          onValueChange={(value) => {
            setParentCategoryId(value)
          }}
          placeholder="Categoria"
        />

        <NewFinancialCategoryOrSubcategory
          title="Categoria"
          type="financialCategory"
        />
      </div>

      <div className="flex justify-center gap-2">
        <CategorySelect
          name={subcategoryId}
          options={subcategories}
          placeholder="Subcategorias"
          disabled={!parentCategoryId}
        />

        <NewFinancialCategoryOrSubcategory
          title="Subcategoria"
          type="subcategory"
          parentCategoryId={parentCategoryId}
          disable={!parentCategoryId}
        />
      </div>
    </>
  )
}
