import { ChangeEvent, useState } from 'react'

export function useMonetaryMask() {
  const [formattedValue, setFormattedValue] = useState('')

  const handleMaskChange = (event: ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value

    inputValue = inputValue.replace(/\D/g, '')

    if (inputValue.length > 2) {
      const cents = inputValue.slice(-2)
      let reais = inputValue.slice(0, -2)

      if (reais.length >= 4) {
        reais = reais.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      }

      inputValue = `${reais},${cents}`
    }

    if (inputValue === '') {
      setFormattedValue('')
    } else {
      setFormattedValue(`R$ ${inputValue}`)
    }
  }

  return { formattedValue, handleMaskChange }
}
