import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SignIn } from '@screens/auth/SignIn'

const { Navigator, Screen } = createNativeStackNavigator()

export function AuthRoutes() {
  return (
    <Navigator>
      <Screen name="signIn" component={SignIn} />
    </Navigator>
  )
}
