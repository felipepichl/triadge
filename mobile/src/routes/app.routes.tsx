import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AccountPayable } from '@screens/app/AccountPayable'
import { Dashboard } from '@screens/app/Dashboard'
import { Transaction } from '@screens/app/Transaction'

type AppRoutes = {
  signIn: undefined
}

const { Navigator, Screen } = createBottomTabNavigator()

export function AppRoutes() {
  return (
    <Navigator>
      <Screen name="dashboard" component={Dashboard} />
      <Screen name="transaction" component={Transaction} />
      <Screen name="accountPayable" component={AccountPayable} />
    </Navigator>
  )
}
