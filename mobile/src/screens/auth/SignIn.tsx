import BackgroundImage from '@assets/background.png'
import Logo from '@assets/logo.svg'
import { Button } from '@components/Button'
import { Input } from '@components/GenericFormAndFileds/Fileds/Input'
import {
  Center,
  Heading,
  Image,
  ScrollView,
  Text,
  VStack,
} from '@gluestack-ui/themed'
import { KeyRound, Mail } from 'lucide-react-native'

export function SignIn() {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1}>
        <Image
          w="$full"
          h={624}
          source={BackgroundImage}
          defaultSource={BackgroundImage}
          alt="Colunas Gregas"
          position="absolute"
        />

        <Center flex={1} px="$10" pb="$16" gap="$8">
          <Center my="$24">
            <Logo />
          </Center>

          <Center gap="$8">
            <Center>
              <Heading color="$gray100">Acessar Painel</Heading>
              <Text color="$gray200">Acesse com as suas credenciais</Text>
            </Center>

            <Center gap="$4">
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                icon={Mail}
              />
              <Input placeholder="Senha" icon={KeyRound} isPassword />
            </Center>
          </Center>

          <Button type="default" title="Acessar Painel" />
        </Center>
      </VStack>
    </ScrollView>
  )
}
