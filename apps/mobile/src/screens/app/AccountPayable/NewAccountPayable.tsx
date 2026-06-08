import { StackHeader } from '@components/Headers/StackHeader'
import { AccountPayableFileds } from '@components/NewTransactionAndAccount/AccountPayableFileds'
import { SharedFields } from '@components/NewTransactionAndAccount/SharedFields'
import { SubmitButton } from '@components/NewTransactionAndAccount/SubmitButton'
import { VStack } from '@components/ui/vstack'
import { useNavigation } from '@react-navigation/native'
import { StackNavigatorRoutesProps } from '@routes/app/stack.routes'
import { useCallback, useRef, useState } from 'react'

import { apiCreateAccountPayable } from '@/api/app/accounts-payable/create-account-payable'
import { apiCreateFixedAccountPayable } from '@/api/app/accounts-payable/create-fixed-account-payable'
import { toast } from '@/utils/toast'

export function NewAccountPayable() {
  const [isLoading, setIsLoading] = useState(false)
  const navigator = useNavigation<StackNavigatorRoutesProps>()

  const formData = useRef({
    description: '',
    amount: 0,
    date: new Date(),
    isFixed: false,
    installments: 1,
    financialCategoryId: '',
    subcategoryId: '',
  })

  const handleSubmit = useCallback(async () => {
    const {
      description,
      amount,
      date,
      isFixed,
      installments,
      financialCategoryId,
      subcategoryId,
    } = formData.current

    if (!description || !amount || !financialCategoryId) {
      toast.error('Preencha todos os campos obrigatórios')
      return
    }

    setIsLoading(true)
    try {
      const data = {
        description,
        amount,
        dueDate: date,
        installments,
        financialCategoryId,
        subcategoryId: subcategoryId || undefined,
      }

      if (isFixed) {
        await apiCreateFixedAccountPayable(data)
      } else {
        await apiCreateAccountPayable(data)
      }

      toast.success('Conta a Pagar salva com sucesso!')
      navigator.goBack()
    } catch {
      toast.error('Erro ao salvar, tente novamente mais tarde!')
    } finally {
      setIsLoading(false)
    }
  }, [navigator])

  return (
    <VStack flex={1}>
      <StackHeader title="Nova Conta a Pagar" />

      <SharedFields
        onDescriptionChange={(v) => { formData.current.description = v }}
        onAmountChange={(v) => { formData.current.amount = v }}
        onDateChange={(d) => { formData.current.date = d }}
        onCategoryChange={(v) => { formData.current.financialCategoryId = v }}
        onSubcategoryChange={(v) => { formData.current.subcategoryId = v }}
      />
      <AccountPayableFileds
        onFixedChange={(v) => { formData.current.isFixed = v }}
        onInstallmentsChange={(v) => { formData.current.installments = v }}
      />
      <SubmitButton onPress={handleSubmit} isLoading={isLoading} />
    </VStack>
  )
}
