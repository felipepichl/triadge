import { Popover } from '@radix-ui/react-popover'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { ChangeEvent } from 'react'
import { Control, FieldValues, Path, UseFormRegister } from 'react-hook-form'

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
import { FinancialCategoryDetailDTO } from '@/dtos/financial-category-dto'
import { SubcategoryDetailDTO } from '@/dtos/subcategory-dto'
import { useMonetaryMask } from '@/hooks/use-monetary-mask'

import { CategorySelect } from '../category-select/category-select'

type SharedFieldProps<T extends FieldValues> = {
  control: Control<T>
  register: UseFormRegister<T>
  financialCategories: FinancialCategoryDetailDTO[]
  subcategories: SubcategoryDetailDTO[]
  parentCategoryId: string
  setParentCategoryId: (id: string) => void
  handleAllFinancialCategoryByUser: () => Promise<void>
  handleAllSubcategoryByCategory: (id: string) => Promise<void>
}

export function SharedField<T extends FieldValues>({
  control,
  register,
  financialCategories,
  subcategories,
  parentCategoryId,
  setParentCategoryId,
  handleAllFinancialCategoryByUser,
  handleAllSubcategoryByCategory,
}: SharedFieldProps<T>) {
  const { formattedValue, handleMaskChange } = useMonetaryMask()

  return (
    <>
      <FormField
        control={control}
        name={'description' as Path<T>}
        render={() => (
          <FormItem>
            <FormControl>
              <Input
                placeholder="Descrição"
                {...register('description' as Path<T>)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={'amount' as Path<T>}
        render={() => (
          <FormItem>
            <FormControl>
              <Input
                className="h-10"
                placeholder="Valor"
                value={formattedValue}
                // inputMode="numeric"
                // type="number"
                {...register('amount' as Path<T>, {
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
        control={control}
        name={'date' as Path<T>}
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
          control={control}
          name={'financialCategoryId' as Path<T>}
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
          control={control}
          name={'subcategoryId' as Path<T>}
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
