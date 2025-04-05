import BackgroundImage from '@assets/background.png'
import Logo from '@assets/logo.svg'
import { Center, Heading, Image, Text, VStack } from '@gluestack-ui/themed'

export function SignIn() {
  return (
    <VStack flex={1} bg="$gray700">
      <Image
        w="$full"
        h={624}
        source={BackgroundImage}
        defaultSource={BackgroundImage}
        alt="Pessoas treinando"
        position="absolute"
      />

      <Center my="$24">
        <Logo />
      </Center>

      <Center>
        <Heading color="$gray100">Acessar Painel</Heading>
        <Text color="$gray200">Acesse com as suas credenciais</Text>
      </Center>
    </VStack>
  )
}
