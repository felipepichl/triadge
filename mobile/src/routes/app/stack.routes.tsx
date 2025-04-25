import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'
import { NewTransaction } from '@screens/app/NewTransaction'

import { TabsRoutes } from './tabs.routes'

type StackRoutes = {
  tabs: undefined
  newTransactions: undefined
}

export type StackNavigatorRoutesProps = NativeStackNavigationProp<StackRoutes>

const { Navigator, Screen } = createNativeStackNavigator<StackRoutes>()

export function StackRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="tabs" component={TabsRoutes} />
      <Screen
        name="newTransactions"
        component={NewTransaction}
        options={{
          presentation: 'modal',
          headerTitle: 'Nova Transação',
        }}
      />
    </Navigator>
  )
}
