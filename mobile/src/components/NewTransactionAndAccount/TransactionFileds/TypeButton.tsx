import { Box, Button, ButtonIcon, ButtonText } from '@gluestack-ui/themed'
import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react-native'
import { ComponentProps } from 'react'

type TypeButtonProps = ComponentProps<typeof Button> & {
  type: 'income' | 'outcome'
  isActive: boolean
}

export function TypeButton({ type, isActive, ...rest }: TypeButtonProps) {
  return (
    <Box flexBasis="48%">
      <Button
        gap="$2"
        h="$20"
        borderRadius="$xl"
        borderWidth="$1"
        borderColor={
          isActive ? (type === 'income' ? '$green500' : '$rose500') : '$gray300'
        }
        bg={
          isActive ? (type === 'income' ? '$green500' : '$rose500') : '$gray700'
        }
        justifyContent="space-between"
        alignItems="center"
        {...rest}
      >
        <ButtonIcon
          as={type === 'income' ? ArrowDownCircle : ArrowUpCircle}
          size="2xl"
          color={
            !isActive
              ? type === 'income'
                ? '$green500'
                : '$rose500'
              : '$gray100'
          }
        />
        <Box flex={1}>
          <ButtonText fontSize="$lg">
            {type === 'income' ? 'Entrada' : 'Saída'}
          </ButtonText>
        </Box>
      </Button>
    </Box>
  )
}
