import { CreateAccountPayableDTO, UpdateAmountVariableDTO } from '@umabel/core'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { apiCreateAccountPayable } from '@/features/accounts-payable/api/create-account-payable'
import { apiCreateFixedAccountPayable } from '@/features/accounts-payable/api/create-fixed-account-payable'
import { apiMarkAccountPayableAsPaid } from '@/features/accounts-payable/api/mark-account-payable-as-paid'
import { apiUpdateAmountVariableToAccountPayable } from '@/features/accounts-payable/api/update-amount-variable-to-account-payable'
import { apiUpdateInterestPaid } from '@/features/accounts-payable/api/update-interest-paid'

export function useCreateAccountPayable() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateAccountPayableDTO) =>
      apiCreateAccountPayable(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts-payable'] })
    },
  })
}

export function useCreateFixedAccountPayable() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateAccountPayableDTO) =>
      apiCreateFixedAccountPayable(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts-payable'] })
    },
  })
}

export function useMarkAccountPayableAsPaid() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (accountPayableId: string) =>
      apiMarkAccountPayableAsPaid({ accountPayableId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts-payable'] })
    },
  })
}

export function useUpdateAmountVariable() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateAmountVariableDTO) =>
      apiUpdateAmountVariableToAccountPayable(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts-payable'] })
    },
  })
}

export function useUpdateInterestPaid() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateAmountVariableDTO) =>
      apiUpdateInterestPaid(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts-payable'] })
    },
  })
}
