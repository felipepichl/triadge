import { ScrollView } from '@gluestack-ui/themed'

import { Summary, SummaryProps } from './Summary'

type SummaryScrollProps = {
  summaries: SummaryProps[] | []
}

export function SummaryScroll({ summaries }: SummaryScrollProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingLeft: 24 }}
      width="100%"
      position="absolute"
      mt="$33"
    >
      {summaries.map((summary) => (
        <Summary
          key={summary.description}
          color={summary.color}
          description={summary.description}
          icon={summary.icon}
          iconColor={summary.iconColor}
          value={summary.value}
        />
      ))}
    </ScrollView>
  )
}
