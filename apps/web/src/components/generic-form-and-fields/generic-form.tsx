import { ReactNode } from 'react'
import { FieldValues, UseFormReturn } from 'react-hook-form'

import { Form } from '@/components/ui/form'

type GenericFormProps<T extends FieldValues> = {
  onSubmit: (data: T) => Promise<void>
  form: UseFormReturn<T>
  fields: ReactNode
}

export function GenericForm<T extends FieldValues>({
  onSubmit,
  form,
  fields,
}: GenericFormProps<T>) {
  return (
    <Form {...form}>
      <form className="mt-3 space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-2">{fields}</div>
      </form>
    </Form>
  )
}
