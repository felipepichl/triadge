import { Box } from '@components/ui/box'
import { Heading } from '@components/ui/heading'
import { HStack } from '@components/ui/hstack'
import { Text } from '@components/ui/text'
import { Icon } from '@gluestack-ui/themed'
import { format } from 'date-fns'
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Calendar,
  Tag,
} from 'lucide-react-native'

import { priceFormatter } from '@/utils/formatter'

type TransactionItemProps = {
  description: string
  amount: number
  type: string
  date: Date
  categoryName?: string
}

export function TransactionItem({
  description,
  amount,
  type,
  date,
  categoryName,
}: TransactionItemProps) {
  const isIncome = type === 'income'
  const amountColor = isIncome ? '$green500' : '$rose500'
  const typeIcon = isIncome ? ArrowDownCircle : ArrowUpCircle

  return (
    <Box bg="$gray400" borderRadius={8} p="$5" mb="$3">
      <HStack justifyContent="space-between" alignItems="center">
        <Heading color="$gray100" fontSize="$xl">
          {description}
        </Heading>
        <Icon as={typeIcon} color={amountColor} size="2xl" />
      </HStack>

      <Heading color={amountColor} fontSize="$2xl" fontFamily="$body" mt="$2">
        {priceFormatter.format(amount)}
      </Heading>

      <HStack justifyContent="space-between" mt="$4">
        <HStack alignItems="center" gap="$1">
          <Icon as={Tag} color="$gray300" size="sm" />
          <Text color="$gray300" fontSize="$sm">
            {categoryName ?? '-'}
          </Text>
        </HStack>

        <HStack alignItems="center" gap="$1">
          <Icon as={Calendar} color="$gray300" size="sm" />
          <Text color="$gray300" fontSize="$sm">
            {format(new Date(date), 'dd/MM/yyyy')}
          </Text>
        </HStack>
      </HStack>
    </Box>
  )
}
