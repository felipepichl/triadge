import { useState } from 'react'
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native'

export function useMonetaryMask() {
  const [formattedValue, setFormattedValue] = useState('')
  const [rawValue, setRawValue] = useState(0)

  const handleMaskChange = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    let inputValue = event.nativeEvent.text

    inputValue = inputValue.replace(/\D/g, '')

    const numericValue = parseInt(inputValue, 10) || 0

    const reaisValue = numericValue / 100
    setRawValue(reaisValue)

    const cents = numericValue % 100
    const reais = Math.floor(numericValue / 100)

    const formattedCents = cents.toString().padStart(2, '0')
    const formattedReais = reais.toLocaleString('pt-BR')

    const formatted = `${formattedReais},${formattedCents}`
    setFormattedValue(`R$ ${formatted}`)
  }

  return { formattedValue, handleMaskChange, rawValue }
}
