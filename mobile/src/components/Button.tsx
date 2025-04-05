import {
  Button as GluestackButton,
  ButtonSpinner,
  Text,
} from '@gluestack-ui/themed'
import { ComponentProps } from 'react'

type ButtonProps = ComponentProps<typeof GluestackButton> & {
  title: string
  isLoading?: boolean
}

export function Button({ title, isLoading = false, ...rest }: ButtonProps) {
  return (
    <GluestackButton
      w="$full"
      h="$14"
      bg="$green700"
      borderWidth="$0"
      borderColor="$green500"
      rounded="$xl"
      $active-bg="$green500"
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? (
        <ButtonSpinner color="$gray100" />
      ) : (
        <Text color="$gray100" fontFamily="$heading">
          {title}
        </Text>
      )}
    </GluestackButton>
  )
}
