import type { StyleProp, ViewStyle } from 'react-native'

interface AnimatedHeaderProps {
  readonly largeTitle?: string
  readonly headerComponent?: React.ReactNode
  readonly children: React.ReactNode
  readonly rightComponent?: React.ReactNode
  readonly showsVerticalScrollIndicator?: boolean
  readonly contentContainerStyle?: StyleProp<ViewStyle>
}

export type { AnimatedHeaderProps }
