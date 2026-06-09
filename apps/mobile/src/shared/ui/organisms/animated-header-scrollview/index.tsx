import { memo } from 'react'
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native'
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Colors, HEADER_HEIGHT, spacing } from './conf'
import type { AnimatedHeaderProps } from './types'

function AnimatedHeaderScrollViewComponent({
  headerComponent,
  children,
  rightComponent,
  showsVerticalScrollIndicator = false,
  contentContainerStyle,
}: AnimatedHeaderProps) {
  const scrollY = useSharedValue<number>(0)
  const insets = useSafeAreaInsets()

  const onScroll = useAnimatedScrollHandler<Record<string, unknown>>({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y
    },
  })

  // Expanded header: fades out as user scrolls
  const expandedHeaderStyle = useAnimatedStyle<
    Partial<Pick<ViewStyle, 'opacity'>>
  >(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, 100, 160],
      [1, 0.6, 0],
      Extrapolation.CLAMP,
    )
    return { opacity }
  })

  // Collapsed header: fades in as user scrolls
  const collapsedHeaderStyle = useAnimatedStyle<
    Partial<Pick<TextStyle, 'opacity'>>
  >(() => {
    const opacity = withTiming<number>(
      interpolate(scrollY.value, [80, 140], [0, 1], Extrapolation.CLAMP),
      { duration: 400 },
    )
    const translateY = withTiming<number>(
      interpolate(scrollY.value, [80, 140], [10, 0], Extrapolation.CLAMP),
      { duration: 400 },
    )
    return {
      opacity,
      transform: [{ translateY }],
    }
  })

  // Collapsed background: solid bg that appears on scroll
  const collapsedBgStyle = useAnimatedStyle<
    Partial<Pick<ViewStyle, 'opacity'>>
  >(() => {
    const opacity = interpolate(
      scrollY.value,
      [60, 120],
      [0, 1],
      Extrapolation.CLAMP,
    )
    return { opacity }
  })

  return (
    <View style={styles.container}>
      {/* Collapsed header background (solid, appears on scroll) */}
      <Animated.View
        style={[
          styles.collapsedHeaderBg,
          {
            height: HEADER_HEIGHT + insets.top,
          },
          collapsedBgStyle,
        ]}
      />

      {/* Collapsed header content (button) */}
      <Animated.View
        style={[
          styles.fixedHeader,
          {
            paddingTop: insets.top,
            height: HEADER_HEIGHT + insets.top,
          },
          collapsedHeaderStyle,
        ]}
      >
        <View style={styles.fixedHeaderContent}>
          <View style={styles.fixedHeaderTextContainer} />
          {rightComponent && (
            <View style={styles.rightComponentContainer}>{rightComponent}</View>
          )}
        </View>
      </Animated.View>

      {/* Scrollable content */}
      <Animated.ScrollView
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        contentContainerStyle={[
          {
            paddingBottom: insets.bottom + spacing.xl,
          },
          contentContainerStyle,
        ]}
      >
        {/* Expanded header (fades on scroll) */}
        <Animated.View style={expandedHeaderStyle}>
          {headerComponent}
        </Animated.View>

        <View style={styles.content}>{children}</View>
      </Animated.ScrollView>
    </View>
  )
}

AnimatedHeaderScrollViewComponent.displayName = 'AnimatedHeaderScrollView'

export const AnimatedHeaderScrollView = memo(AnimatedHeaderScrollViewComponent)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  collapsedHeaderBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: Colors.headerBackground,
  },
  fixedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 11,
    justifyContent: 'flex-end',
  },
  fixedHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },
  fixedHeaderTextContainer: {
    flex: 1,
  },
  rightComponentContainer: {
    marginLeft: spacing.md,
  },
  content: {
    paddingHorizontal: spacing.md,
  },
})
