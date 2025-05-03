import { NewFinancialCategoryOrSubcategory } from '@components/NewFinancialCategoryOrSubcategory'
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'
import { NewAccountPayable } from '@screens/app/AccountPayable/NewAccountPayable'
import { NewTransaction } from '@screens/app/Transaction/NewTransaction'

import { TabsRoutes } from './tabs.routes'

export type StackRoutes = {
  tabs: undefined
  newTransactions: undefined
  newAccountPayable: undefined
  newFinancialCategoryOrSubcategory: {
    type: 'financialCategory' | 'subcategory'
    parentCategoryId?: string
  }
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
      <Screen
        name="newFinancialCategoryOrSubcategory"
        component={NewFinancialCategoryOrSubcategory}
        options={{
          presentation: 'modal',
        }}
      />
    </Navigator>
  )
}
