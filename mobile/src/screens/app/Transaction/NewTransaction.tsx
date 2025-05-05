import { StackHeader } from '@components/Headers/StackHeader'
import { SharedFields } from '@components/NewTransactionAndAccount/SharedFields/'
import { SubmitButton } from '@components/NewTransactionAndAccount/SubmitButton'
import { TransactionTypeButton } from '@components/NewTransactionAndAccount/TransactionFileds/TransactionTypeButton'
import { VStack } from '@gluestack-ui/themed'

export function NewTransaction() {
  return (
    <VStack flex={1}>
      <StackHeader title="Nova Transação" />

      <SharedFields />
      <TransactionTypeButton />
      <SubmitButton />
    </VStack>
  )
}
