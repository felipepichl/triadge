import { Box, Heading, Icon, VStack } from '@gluestack-ui/themed'

type ColorType = 'default' | 'green' | 'rose'

const colorClasses = {
  default: '$gray400',
  green: '$green600',
  rose: '$rose500',
}

export type SummaryProps = {
  color: ColorType
  description: string
  icon: React.ElementType
  iconColor: '$green500' | '$gray100' | '$rose500'
  value: string
  totalAmount?: string
}

export function Summary({
  color,
  description,
  icon,
  iconColor,
  value,
  totalAmount,
}: SummaryProps) {
  return (
    <VStack
      width={300}
      borderRadius={8}
      bg={colorClasses[color] || colorClasses.default}
      mr="$4"
    >
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        p="$5"
      >
        <Heading color="$gray100" fontSize="$xl">
          {description}
        </Heading>

        <Icon as={icon} color={iconColor} size="2xl" />
      </Box>
      <Box p="$5">
        <Heading fontSize="$2xl" color="$gray100" fontFamily="$body">
          {value}
        </Heading>
      </Box>
    </VStack>
  )
}
