import Container from 'react-lottie'

import notFoundAnimation from '@/assets/not-found-new.json'

import { CardDescription } from './ui/card'

export function NotFound() {
  return (
    <>
      <Container
        options={{
          animationData: notFoundAnimation,
        }}
        height={200}
        width={200}
      />
      <CardDescription className="pb-3 text-center">
        Nenhuma transação encontrada
      </CardDescription>
    </>
  )
}
