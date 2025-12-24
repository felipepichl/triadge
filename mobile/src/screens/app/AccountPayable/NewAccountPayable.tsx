import { StackHeader } from '@components/Headers/StackHeader'
import { AccountPayableFileds } from '@components/NewTransactionAndAccount/AccountPayableFileds'
import { SharedFields } from '@components/NewTransactionAndAccount/SharedFields'
import { SubmitButton } from '@components/NewTransactionAndAccount/SubmitButton'
import { VStack } from '@gluestack-ui/themed'

export function NewAccountPayable() {
  return (
    <VStack flex={1}>
      <StackHeader title="Nova Conta a Pagar" />

      <SharedFields />
      <AccountPayableFileds />
      <SubmitButton />
    </VStack>
  )
}
