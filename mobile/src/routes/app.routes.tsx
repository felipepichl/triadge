import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import { AccountPayable } from '@screens/app/AccountPayable'
import { Dashboard } from '@screens/app/Dashboard'
import { Stock } from '@screens/app/Stock'
import { Transaction } from '@screens/app/Transaction'
import {
  ArrowLeftRightIcon,
  ChartCandlestick,
  ScanBarcode,
  School,
} from 'lucide-react-native'

import { gluestackUIConfig } from '../../config/gluestack-ui.config'

type AppRoutes = {
  dashboard: undefined
  transaction: undefined
  accountPayable: undefined
  stock: undefined
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

export function AppRoutes() {
  const { tokens } = gluestackUIConfig
  const iconSize = tokens.space['6']

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: tokens.colors.green500,
        tabBarInactiveTintColor: tokens.colors.gray200,
      }}
    >
      <Screen
        name="dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ color }) => <School size={iconSize} color={color} />,
        }}
      />
      <Screen
        name="transaction"
        component={Transaction}
        options={{
          tabBarIcon: ({ color }) => (
            <ArrowLeftRightIcon size={iconSize} color={color} />
          ),
        }}
      />
      <Screen
        name="accountPayable"
        component={AccountPayable}
        options={{
          tabBarIcon: ({ color }) => (
            <ScanBarcode size={iconSize} color={color} />
          ),
        }}
      />
      <Screen
        name="stock"
        component={Stock}
        options={{
          tabBarIcon: ({ color }) => (
            <ChartCandlestick size={iconSize} color={color} />
          ),
        }}
      />
    </Navigator>
  )
}
