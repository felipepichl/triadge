import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'
import { NewAccountPayable } from '@screens/app/AccountPayable/NewAccountPayable'
import { NewTransaction } from '@screens/app/Transaction/NewTransaction'

import { TabsRoutes } from './tabs.routes'

type StackRoutes = {
  tabs: undefined
  newTransactions: undefined
  newAccountPayable: undefined
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
        }}
      />
      <Screen
        name="newAccountPayable"
        component={NewAccountPayable}
        options={{
          presentation: 'modal',
        }}
      />
    </Navigator>
  )
}
