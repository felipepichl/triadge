import {
  Icon,
  Input as GluestackInput,
  InputField,
  InputIcon,
  InputSlot,
} from '@gluestack-ui/themed'
import { Eye, EyeOff, LucideIcon } from 'lucide-react-native'
import { ComponentProps, useState } from 'react'

type InputProps = ComponentProps<typeof InputField> & {
  icon?: LucideIcon
  isPassword?: boolean
}

export function Input({ icon, isPassword = false, ...rest }: InputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const inputType = isPassword
    ? showPassword
      ? 'text'
      : 'password'
    : rest.type

  return (
    <GluestackInput
      bg="$gray700"
      h="$14"
      px="$4"
      borderRadius="$xl"
      borderColor="$gray300"
      $focus={{
        borderWidth: 1,
        borderColor: '$green500',
      }}
      alignItems="center"
    >
      {icon && (
        <Icon
          as={icon}
          color={isFocused ? '$green500' : '$gray300'}
          size="xl"
        />
      )}
      <InputField
        color="$white"
        fontFamily="$body"
        placeholderTextColor="$gray300"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        type={inputType}
        {...rest}
      />

      {isPassword && (
        <InputSlot onPress={() => setShowPassword(!showPassword)}>
          <InputIcon
            as={showPassword ? Eye : EyeOff}
            color={isFocused ? '$green500' : '$gray300'}
            size="xl"
          />
        </InputSlot>
      )}
    </GluestackInput>
  )
}
