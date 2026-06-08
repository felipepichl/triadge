import { useFormContext } from 'react-hook-form'

import { Button } from '../ui/button'
import { Separator } from '../ui/separator'

export function SubmitButton() {
  const {
    formState: { isSubmitting },
  } = useFormContext()

  return (
    <>
      <Separator />

      <Button
        className="h-12 w-full font-bold hover:bg-green-700  hover:text-slate-100"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Salvando...' : 'Cadastrar'}
      </Button>
    </>
  )
}
