import { DatePickerContext } from '@/Provider/DatePickerProvider'
import { useContext } from 'react'

const useDatePicker = () => {
  return useContext(DatePickerContext)
}

export default useDatePicker
