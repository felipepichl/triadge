import { HStack } from '@gluestack-ui/themed'
import { useCallback, useState } from 'react'

import { TypeButton } from './TypeButton'

export function TransactionTypeButton() {
  const [transactionType, setTransactionType] = useState('')

  const handleTransactionTypeSelect = useCallback(
    (type: 'income' | 'outcome') => {
      console.log('here', type)
      setTransactionType(type)
    },
    [],
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
