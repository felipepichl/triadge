import { HStack } from '@components/ui/hstack'
import { useCallback, useState } from 'react'

import { TypeButton } from './TypeButton'

type TransactionTypeButtonProps = {
  onTypeChange?: (type: 'income' | 'outcome') => void
}

export function TransactionTypeButton({
  onTypeChange,
}: TransactionTypeButtonProps) {
  const [transactionType, setTransactionType] = useState('')

  const handleTransactionTypeSelect = useCallback(
    (type: 'income' | 'outcome') => {
      setTransactionType(type)
      onTypeChange?.(type)
    },
    [onTypeChange],
  )

  return (
    <HStack flex={1} px="$4" gap="$4">
      <TypeButton
        type="income"
        onPress={() => handleTransactionTypeSelect('income')}
        isActive={transactionType === 'income'}
      />

      <TypeButton
        type="outcome"
        onPress={() => handleTransactionTypeSelect('outcome')}
        isActive={transactionType === 'outcome'}
      />
    </HStack>
  )
}
