import { ChangeEvent, useState } from 'react'

export function useMonetaryMask() {
  const [formattedValue, setFormattedValue] = useState('')
  const [rawValue, setRawValue] = useState(0)

  const handleMaskChange = (event: ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value

    // Remove todos os caracteres não numéricos
    inputValue = inputValue.replace(/\D/g, '')

    // Converte para um valor numérico
    const numericValue = parseInt(inputValue, 10) || 0

    // Calcula o valor em reais
    const reaisValue = numericValue / 100
    setRawValue(reaisValue)

    // Formata o valor para exibição
    const cents = numericValue % 100
    const reais = Math.floor(numericValue / 100)

    const formattedCents = cents.toString().padStart(2, '0')
    const formattedReais = reais.toLocaleString('pt-BR')

    const formatted = `${formattedReais},${formattedCents}`
    setFormattedValue(`R$ ${formatted}`)
  }

  return { formattedValue, handleMaskChange, rawValue }
}
