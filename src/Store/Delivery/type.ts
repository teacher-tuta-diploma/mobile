export type LocationResultT = {
  results: LocationDetailT[]
  status: 'OK' | 'INVALID_REQUEST'
  error_message?: string
}
export type LocationDistanceT = {
  destination_addresses: string[]
  origin_addresses: string[]
  rows: {
    elements: {
      distance: DistanceT
      duration: DurationT
    }[]
  }[]
}

export type DistanceT = {
  text: string
  value: number
}
export type DurationT = {
  text: string
  value: number
}

export type LocationDetailT = {
  address_components: any[]
  formatted_address: string
  geometry: {
    location: {
      lat: number
      lng: number
    }
    location_type: string
    viewport: {
      northeast: {
        lat: number
        lng: number
      }
      southwest: {
        lat: number
        lng: number
      }
    }
  }
  place_id: string
  plus_code: {
    compound_code: string
    global_code: string
  }
  types: [string]
}

export type SelectedLocationT = {
  address: string
  locationName: string
  contact: string
  numberPhoneContact: string
  latitude: number
  longitude: number
  placeId: string
  note?: string
}

export type SelectedCarT = {
  id: number
  title: string
  description: string
  height: number
  width: number
  length: number
  maxWeight: number
}

export type ProductT = {
  desc: string
  icon: string
  id: number
  name: string
  parentId: number
  price: number
  status: number
  type: string
}

export type VehicleT = {
  categoryId: number
  driverId: number
  id: number
  lastLat: string
  lastLng: string
  licensePlatese: string
  ownerTypeId: number
  sort: null
  status: string
  updatedAt: string
  workingAreaId: number
}

export type OrderVehicleCategoryT = {
  capacity: number
  createdAt: string
  description: string
  height: number
  id: number
  length: number
  name: string
  sort: null
  status: string
  updatedAt: string
  volumn: number
  width: number
  workingAreaId: number
}

export type OrderT = {
  actualFee: number
  code: string
  completeDate: string
  created_at: string
  driverArrivedDate: string
  driverFinding: boolean
  driverHandlingId: number
  expectedFee: number
  payDetailType: number
  payType: number
  serviceId: number
  startDate: string
  status: number
  vehicleCategoryId: number
  vehicleId: number
  pickupType: number
  pickupDate: string
  orderLocations: OrderLocationT[]
  orderFitmentItems: FitmentOrderT[]
  orderVehicleCategories: OrderVehicleCategoryT[]
  products: ProductT[]
  vehicles: VehicleT[]
  bills: Bills[]
  distance: string
  price: string
  createdAt: string
  applicationRateStar: number
  serviceRateStar: number
  applicationEvaluateSettingId: number
  applicationGuestReviews: string
  serviceEvaluateSettingId: number
  serviceGuestReviews: string
  isPayment: boolean
  isQuotation: boolean
  contractUrl: string
  signatureUrl: string
  signedContract: boolean
}

export type OrderLocationT = {
  contact: string
  created_at: string
  id: number
  locationDetail: string
  location: string
  orderCode: string
  phone: string
  placeId: string
  status: number
  type: number
  latitude: number
  longitude: number
  pickupType: number
  pickupDate: string
  note?: string
  sort: number
}

export type SenderReceiverT = {
  name: string
  phone: string
  address: string
  time: string
  id: number
  latitude: number
  longitude: number
}

export type PaymentMethodT = {
  createdAt: string
  deletedAt: string
  id: number
  name: string
  sort: number
  status: string
  updatedAt: string
}

export type ExpectedFeeT = {
  key: string
  name: string
  price: number
  quantity?: number
}

export type transportFeeT = {
  data: number
  status: number
}

export type promotonT = {
  id: number
  code: string
  discount: string
  discountType: string
  maxDiscount: string
  minPrice: string
  quantity: number
  name: string
  bannerUrl: string
}

export type FitmentGroupT = {
  id: number
  name: string
}

export type FitmentT = {
  id: number
  cost: string
  name: string
  fitmentGroupId: number
  calculation_unit: string
  size: string
  quantity: number
}

export type FitmentOrderT = {
  fitmentItem: {
    calculation_unit: string
    cost: string
    fitmentGroupId: number
    name: string
    size: string
  }
  id: number
  quantity: number
}

export type OrderCompleteT = {
  actualFee: number
  code: string
  completeDate: string
  contactHuman: string
  createdAt: string
  createdBy: number
  deletedAt: null
  deletedBy: null
  distance: number
  driverArrivedDate: string
  driverHandlingId: number
  expectedFee: number
  failReason: string
  guestId: number
  orderCancelReasons: []
  orderCode: string
  payDetailType: number
  payType: number
  pickupDate: null
  pickupType: null
  price: null
  serviceId: 3
  startDate: null
  status: 1
  surveyAppointmentTime: null
  surveyLocation: null
  telephoneContact: null
  type: 'DEFAULT'
  updatedAt: '2022-10-14T08:31:48.855Z'
  updatedBy: 10
}

/**
 * đơn hàng có type = QTTN thì check mã = type, đơn EXPT check = key
 */
export type Bills = {
  orderCode: string
  note?: string
  type: 'ACTL' | 'EXPT' | 'QTTN'
  promotionCode?: string
  billDetails: {
    id: number
    key:
      | 'VC'
      | 'TAX'
      | 'PRM'
      | 'PAK'
      | 'OVN'
      | 'EXT'
      | 'RTN'
      | 'RTF'
      | 'MSB'
      | 'FTM'
    name: string
    price: number
    type:
      | 'VC'
      | 'TAX'
      | 'PRM'
      | 'PAK'
      | 'OVN'
      | 'EXT'
      | 'RTN'
      | 'RTF'
      | 'MSB'
      | 'FTM'
  }[]
}

export type EvaluateSettingT = {
  id: number
  description: string
}

export type EvaluateT = {
  applicationRateStar: number
  serviceRateStar: number
  applicationEvaluateSettingId?: number
  applicationGuestReviews?: string
  serviceEvaluateSettingId?: number
  serviceGuestReviews?: string
}

export type NewsT = {
  title: string
  link: string
  url: string
}

export type AdvertisementsT = {
  name: string
  startTime: string
  endTime: string
  imageDisplay: string
  displayInApp: boolean
  displayWhenOpenApp: boolean
  workingAreaId: number
  content: string
}

export type WorkingAreaT = {
  id: number
  name: string
}
