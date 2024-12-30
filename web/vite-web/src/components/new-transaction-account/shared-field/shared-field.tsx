import { Popover } from '@radix-ui/react-popover'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { ChangeEvent, useState } from 'react'
import { FieldValues, useFormContext } from 'react-hook-form'

import { NewFinancialCategoryOrSubcategory } from '@/components/new-financial-category-or-subcategory/new-financial-category-or-subcategory'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useFinancialCategoryAndSubcategory } from '@/hooks/use-financial-category-and-subcategory'
import { useMonetaryMask } from '@/hooks/use-monetary-mask'

import { getFieldPaths } from '../@types/filed-paths'
import { CategorySelect } from './category-select'

export function SharedField<T extends FieldValues>() {
  const [parentCategoryId, setParentCategoryId] = useState<string>('')

  const { formattedValue, handleMaskChange } = useMonetaryMask()
  const {
    financialCategories,
    subcategories,
    handleAllFinancialCategoryByUser,
    handleAllSubcategoryByCategory,
  } = useFinancialCategoryAndSubcategory()

  const form = useFormContext<T>()
  const { description, amount, date, financialCategoryId, subcategoryId } =
    getFieldPaths<T>()

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
                // inputMode="numeric"
                // type="number"
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
                      <span>Pick a date</span>
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

      <div className="flex  justify-center gap-2">
        <CategorySelect
          control={form.control}
          name={financialCategoryId}
          options={financialCategories}
          onValueChange={(value) => {
            setParentCategoryId(value)
            handleAllSubcategoryByCategory(value)
          }}
          onOpenChange={handleAllFinancialCategoryByUser}
          placeholder="Categoria"
        />

        <NewFinancialCategoryOrSubcategory
          title="Categoria"
          type="financialCategory"
        />
      </div>

      <div className="flex  justify-center gap-2">
        <CategorySelect
          control={form.control}
          name={subcategoryId}
          options={subcategories}
          onOpenChange={() => handleAllSubcategoryByCategory(parentCategoryId)}
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
