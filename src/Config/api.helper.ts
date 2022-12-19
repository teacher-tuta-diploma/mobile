import {
  ExpectedFeeT,
  OrderT,
  ProductT,
  SelectedCarT,
  SenderReceiverT,
} from '@/Store/Delivery/type'
import { StatusOrderE } from '@/Store/Delivery/enum'
import { formatTimeDate2 } from './utils'

export type MapServiceT = {
  title: string
  note: string
  price: string
  subTasks: {
    title: string
    note: string
    price: string
    id: number
  }[]
  id: number
}

export const mapProducts = (data: ProductT[]): MapServiceT[] => {
  return data.map(mapProduct => ({
    title: mapProduct.name,
    note: mapProduct.desc,
    price: mapProduct.price.toString(),
    subTasks: [],
    id: mapProduct.id,
  }))
}

export const mapVehicleCategory = (data: any[]): SelectedCarT[] => {
  return data.map(v => ({
    id: v.id,
    title: v.name,
    description: v.description,
    height: v.height,
    width: v.width,
    length: v.length,
    maxWeight: v.capacity,
  }))
}

export const mapSenderReceiver = (data: NonNullable<any>): SenderReceiverT => {
  return {
    id: data.id,
    name: data.contact,
    phone: data.phone,
    address: data.location,
    time: '',
    latitude: data.latitude,
    longitude: data.longitude,
  }
}

export const getSendTime = (
  pickupType?: number,
  pickupDate?: string,
): string => {
  return pickupType === 0
    ? 'Lấy hàng ngay'
    : pickupDate
    ? 'Lấy hàng lúc: ' + formatTimeDate2(new Date(pickupDate))
    : ''
}

export const pushExpectedFees = (
  fees: ExpectedFeeT[],
  fee: ExpectedFeeT,
  condition: boolean,
) => {
  if (condition) {
    return [...fees, fee]
  }
  return fees
}

export function navigateOrder(order: OrderT, replace: any) {
  switch (order?.status) {
    case StatusOrderE['Chuyến hàng mới']:
      replace('NewDeliveryOrder', { order })
      break
    case StatusOrderE['Chờ tư vấn']:
      replace('WaitingAdviseOrder', { order })
      break
    case StatusOrderE['Đã tư vấn']:
      replace('AdvisedOrder', { order })
      break
    case StatusOrderE['Đang giao hàng']:
    case StatusOrderE['Đã có tài xế']:
    case StatusOrderE['Tài xế đang đến']:
    case StatusOrderE['Tài xế đã đến']:
      replace('WaitingDeliveryOrder', { order })
      break
    case StatusOrderE['Hoàn thành']:
      replace('DetailsOrderCompleted', { order })
      break
    case StatusOrderE['Hủy']:
      replace('CancelDeliveryOrder', { order })
      break
    case StatusOrderE['Thất bại']:
      replace('FailDeliveryOrder', { order })
      break
  }
}
