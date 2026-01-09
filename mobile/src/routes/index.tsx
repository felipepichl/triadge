import { Box } from '@components/ui/box'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'

import { gluestackUIConfig } from '../../config/gluestack-ui.config'
import { PrivateRoute } from './private-route'

export function Routes() {
  const theme = DefaultTheme
  theme.colors.background = gluestackUIConfig.tokens.colors.gray700

  return (
    <Box flex={1} bg="$gray700">
      <NavigationContainer theme={theme}>
        <PrivateRoute />
      </NavigationContainer>
    </Box>
  )
}
