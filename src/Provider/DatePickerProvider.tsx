import React, { useCallback, useMemo, useState } from 'react'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

export type DatePickerT = {
  status: boolean
  toggle: (bool: boolean, _mode?: 'date' | 'time' | 'datetime') => void
  selectedDate?: Date
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>
  setMinimumDateDate: React.Dispatch<React.SetStateAction<Date | undefined>>
}

export const DatePickerContext = React.createContext<Partial<DatePickerT>>({})

const DatePickerProvider = ({ children }: { children: React.ReactNode }) => {
  const [status, setStatus] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [minimumDateDate, setMinimumDateDate] = useState<Date>()

  const [mode, setMode] = useState<'date' | 'time' | 'datetime'>('datetime')

  const toggle = useCallback(
    (bool: boolean, _mode: 'date' | 'time' | 'datetime' = 'datetime') => {
      setStatus(bool)
      setMode(_mode)
    },
    [],
  )

  const hideDatePicker = () => {
    setStatus(false)
  }

  const handleConfirm = (date: Date) => {
    setSelectedDate(date)

    console.warn(
      'A date has been picked: ',
      date,
      date.toUTCString(),
      date.toTimeString(),
    )
    setStatus(false)
  }

  const contextValue = useMemo<DatePickerT>(
    () => ({
      status,
      toggle,
      selectedDate,
      setSelectedDate,
      setMinimumDateDate,
    }),
    [selectedDate, status, toggle],
  )
  return (
    <DatePickerContext.Provider value={contextValue}>
      {children}
      <DateTimePickerModal
        isVisible={status}
        mode={mode}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        onHide={hideDatePicker}
        date={selectedDate}
        minimumDate={minimumDateDate}
      />
    </DatePickerContext.Provider>
  )
}

export default DatePickerProvider
