import moment from 'moment'

export const formatDateTime = (date: Date) => {
  return moment(date).format('DD-MM-YYYY HH:mm')
}

export const formatDeliveryDateTime = (date: Date) => {
  return moment(date).format('YYYY-MM-DD HH:mm')
}

export const formatTimeDate = (date: Date) => {
  return moment(date).format('HH:mm DD-MM-YYYY')
}

export const formatTimeDate2 = (date: Date) => {
  if (date) {
    return moment(date).format('HH:mm DD/MM/YYYY')
  }
  return ''
}

export const formatTimeOrDate = (date: Date) => {
  const today = moment()
  const day = moment(date)
  if (day.year() === today.year()) {
    if (day.dayOfYear() === today.dayOfYear()) {
      return day.format('HH:mm')
    } else {
      return day.format('DD/MM')
    }
  } else {
    return day.format('MM/YYYY')
  }
}

export const formatDateTimeDob = (date: Date) => {
  return moment(date).format('DD/MM/yyyy')
}

export function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function numberWithCommas(x: number) {
  const numbers = Number(x).toFixed(0).toString().split('.')
  return numbers[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
