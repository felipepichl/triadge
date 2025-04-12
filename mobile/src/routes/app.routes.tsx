import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import { AccountPayable } from '@screens/app/AccountPayable'
import { Dashboard } from '@screens/app/Dashboard'
import { Transaction } from '@screens/app/Transaction'

type AppRoutes = {
  dashboard: undefined
  transaction: undefined
  accountPayable: undefined
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

export function AppRoutes() {
  return (
    <Navigator>
      <Screen name="dashboard" component={Dashboard} />
      <Screen name="transaction" component={Transaction} />
      <Screen name="accountPayable" component={AccountPayable} />
    </Navigator>
  )
}
