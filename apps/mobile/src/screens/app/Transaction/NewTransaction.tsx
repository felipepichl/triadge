import { StackHeader } from '@components/Headers/StackHeader'
import { SharedFields } from '@components/NewTransactionAndAccount/SharedFields/'
import { SubmitButton } from '@components/NewTransactionAndAccount/SubmitButton'
import { TransactionTypeButton } from '@components/NewTransactionAndAccount/TransactionFileds/TransactionTypeButton'
import { VStack } from '@components/ui/vstack'
import { useNavigation } from '@react-navigation/native'
import { StackNavigatorRoutesProps } from '@routes/app/stack.routes'
import { useCallback, useRef, useState } from 'react'

import { apiCreateTransaction } from '@/api/app/transactions/create-transaction'
import { toast } from '@/utils/toast'

export function NewTransaction() {
  const [isLoading, setIsLoading] = useState(false)
  const navigator = useNavigation<StackNavigatorRoutesProps>()

  const formData = useRef({
    description: '',
    amount: 0,
    date: new Date(),
    type: '' as 'income' | 'outcome' | '',
    financialCategoryId: '',
    subcategoryId: '',
  })

  const handleSubmit = useCallback(async () => {
    const { description, amount, date, type, financialCategoryId, subcategoryId } =
      formData.current

    if (!description || !amount || !type || !financialCategoryId) {
      toast.error('Preencha todos os campos obrigatórios')
      return
    }

    setIsLoading(true)
    try {
      await apiCreateTransaction({
        description,
        amount,
        date,
        type,
        financialCategoryId,
        subcategoryId: subcategoryId || undefined,
      })

      toast.success('Transação salva com sucesso!')
      navigator.goBack()
    } catch {
      toast.error('Erro ao salvar, tente novamente mais tarde!')
    } finally {
      setIsLoading(false)
    }
  }, [navigator])

  return (
    <VStack flex={1}>
      <StackHeader title="Nova Transação" />

      <SharedFields
        onDescriptionChange={(v) => { formData.current.description = v }}
        onAmountChange={(v) => { formData.current.amount = v }}
        onDateChange={(d) => { formData.current.date = d }}
        onCategoryChange={(v) => { formData.current.financialCategoryId = v }}
        onSubcategoryChange={(v) => { formData.current.subcategoryId = v }}
      />
      <TransactionTypeButton
        onTypeChange={(t) => { formData.current.type = t }}
      />
      <SubmitButton onPress={handleSubmit} isLoading={isLoading} />
    </VStack>
  )
}
