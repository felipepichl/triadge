import { ChangeEvent, useState } from 'react'

export function useMonetaryMask() {
  const [formattedValue, setFormattedValue] = useState('')

  const handleMaskChange = (event: ChangeEvent<HTMLInputElement>) => {
    const unformattedValue = event.target.value.replace(/\D/g, '') // Remove non-digits

    if (!unformattedValue) {
      setFormattedValue('')
      return
    }

    const parts = unformattedValue.split('.') // Use period as separator
    const integerPart = parts[0] // Get the integer part without padding

    let decimalPart = ''
    if (parts.length > 1) {
      // Handle cases like 1.25 or 125.25
      if (parts[1].length === 2 && integerPart === '1') {
        decimalPart = parts[1] // No leading zeros for 1.25
      } else {
        decimalPart = parts[1].slice(0, 2).padEnd(2, '0') // 2 decimal places
      }
    }

    // Handle backspace by removing trailing zeros
    if (event.nativeEvent.inputType === 'deleteContentBackward') {
      const newIntegerPart = integerPart.slice(0, -1) // Remove the last digit
      const newFormattedValue = `${newIntegerPart}.${decimalPart}`

      // Prevent negative values
      if (newIntegerPart === '') {
        setFormattedValue('0.00')
        return
      }

      setFormattedValue(newFormattedValue)
      return
    }

    const formatted = `${integerPart.padStart(3, '0')}.${decimalPart}`
    setFormattedValue(formatted)
  }

  return { formattedValue, handleMaskChange }
}
