import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  Box,
  HStack,
  Icon,
  Text,
} from '@gluestack-ui/themed'
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Calendar } from 'lucide-react-native'
import { useState } from 'react'
import { Pressable } from 'react-native'
import { Calendar as CustomCalendar, DateData } from 'react-native-calendars'

import { gluestackUIConfig } from '../../../../config/gluestack-ui.config'

export function DatePicker() {
  const [isPressed, setIsPressed] = useState(false)
  const [selectedDate, setSelectedDate] = useState(() =>
    format(new Date(), 'yyyy-MM-dd'),
  )
  const [formattedDate, setFormattedDate] = useState(() =>
    format(new Date(), 'LLLL dd, y', { locale: ptBR }),
  )

  const { green500, gray100, gray300, gray600 } =
    gluestackUIConfig.tokens.colors

  return (
    <Pressable onPress={() => setIsPressed(true)}>
      <HStack
        bg="$gray700"
        h="$14"
        px="$4"
        borderRadius="$xl"
        borderColor={isPressed ? '$green500' : '$gray300'}
        borderWidth="$1"
        alignItems="center"
      >
        <Icon as={Calendar} color="$gray300" size="xl" px="$6" />
        <Text color="$gray300" fontFamily="$body">
          {formattedDate}
        </Text>
      </HStack>

      <Actionsheet isOpen={isPressed} onClose={() => setIsPressed(false)}>
        <ActionsheetBackdrop />
        <ActionsheetContent bg="$gray600" px="$2">
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator bg="$gray400" mb="$2" />
          </ActionsheetDragIndicatorWrapper>
          <Box w="$full">
            <CustomCalendar
              onDayPress={(day: DateData) => {
                const parsed = parseISO(day.dateString)
                setSelectedDate(day.dateString)
                setFormattedDate(
                  format(new Date(parsed), 'LLLL dd, y', {
                    locale: ptBR,
                  }),
                )
                setIsPressed(false)
              }}
              theme={{
                calendarBackground: gray600,
                arrowColor: green500,
                monthTextColor: gray100,
                dayTextColor: gray100,
                textDisabledColor: gray300,
                todayTextColor: green500,
              }}
              markedDates={{
                [selectedDate]: {
                  selected: true,
                  selectedColor: green500,
                  selectedTextColor: 'white',
                },
              }}
            />
          </Box>
        </ActionsheetContent>
      </Actionsheet>
    </Pressable>
  )
}
