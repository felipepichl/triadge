import {
  Button as GluestackButton,
  ButtonSpinner,
  Icon,
  Text,
} from '@gluestack-ui/themed'
import { LucideIcon } from 'lucide-react-native'
import { ComponentProps } from 'react'

type ButtonPropsBase = ComponentProps<typeof GluestackButton> & {
  variant?: 'solid' | 'outline'
  iconSize?: 'default' | 'icon'
  isLoading?: boolean
}

type ButtonPropsWithIcon = ButtonPropsBase & {
  icon: LucideIcon
  title?: string
}

type ButtonPropsWithTitle = ButtonPropsBase & {
  icon?: never
  title: string
}

type ButtonProps = ButtonPropsWithIcon | ButtonPropsWithTitle

export function Button({
  title,
  variant = 'solid',
  iconSize = 'default',
  icon,
  isLoading = false,
  ...rest
}: ButtonProps) {
  return (
    <GluestackButton
      w={iconSize === 'default' ? '$full' : '$14'}
      h="$14"
      bg={variant === 'outline' ? 'transparent' : '$green700'}
      borderWidth={variant === 'outline' ? '$1' : '$0'}
      borderColor="$green500"
      rounded="$xl"
      $active-bg={variant === 'outline' ? '$gray500' : '$green500'}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? (
        <ButtonSpinner color="$gray100" />
      ) : icon ? (
        <Icon as={icon} color="$green500" size="2xl" />
      ) : (
        <Text color="$gray100" fontFamily="$heading">
          {title}
        </Text>
      )}
    </GluestackButton>
  )
}
