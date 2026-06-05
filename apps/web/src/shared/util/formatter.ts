export const priceFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export function parseCurrency(value: string): number {
  return parseFloat(
    value.replace('R$ ', '').replace('.', '').replace(',', '.'),
  )
}
