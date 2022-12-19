import { MapServiceT } from '@/Config/api.helper'
import { createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'
import { FitmentT, SelectedCarT, SelectedLocationT } from './type'

const initialState = {
  storedLocations: [],
  selectedServices: [],
  fitments: [],
} as Partial<DeliveryState>

const slice = createSlice({
  name: 'delivery',
  initialState: initialState,
  reducers: {
    setDeliveryTime: (state, { payload: { date } }: DeliveryPayload) => {
      if (typeof date !== 'undefined') {
        state.date = date
      }
    },
    setTypeLocation: (
      state,
      { payload: { typeLocation } }: DeliveryPayload,
    ) => {
      if (typeof typeLocation !== 'undefined') {
        state.typeLocation = typeLocation
      }
    },
    setMyLocation: (state, { payload: { myLocation } }: DeliveryPayload) => {
      if (typeof myLocation !== 'undefined') {
        state.myLocation = myLocation
      }
    },
    setDeliveryLocation: (
      state,
      { payload: { deliveryLocation } }: DeliveryPayload,
    ) => {
      if (typeof deliveryLocation !== 'undefined') {
        state.deliveryLocation = deliveryLocation
      }
    },
    setSelectedLocation: (
      state,
      { payload: { selectedLocation } }: DeliveryPayload,
    ) => {
      if (typeof selectedLocation !== 'undefined') {
        state.selectedLocation = selectedLocation
      }
    },
    pushReceiveLocation: (
      state,
      { payload: { deliveryLocation, key } }: DeliveryPayload,
    ) => {
      if (typeof deliveryLocation !== 'undefined') {
        state.receiveLocations = {
          ...(state.receiveLocations ?? {}),
          ...{
            [key!]: deliveryLocation,
          },
        }
      }
    },
    removeReceiveLocation: (state, { payload: { key } }: DeliveryPayload) => {
      if (typeof key !== 'undefined') {
        delete state.receiveLocations?.[key]
      }
    },
    setIsNow: (state, { payload: { isNow } }: DeliveryPayload) => {
      if (typeof isNow !== 'undefined') {
        state.isNow = isNow
        if (isNow) {
          state.date = undefined
        }
      }
    },
    pushStoredLocations: (
      state,
      { payload: { deliveryLocation } }: DeliveryPayload,
    ) => {
      if (typeof deliveryLocation !== 'undefined') {
        if (deliveryLocation) {
          state.storedLocations?.push(deliveryLocation)
        }
      }
    },
    updateStoredLocations: (
      state,
      { payload: { deliveryLocation } }: DeliveryPayload,
    ) => {
      if (typeof deliveryLocation !== 'undefined') {
        if (deliveryLocation) {
          state.storedLocations?.splice(
            state.storedLocations.findIndex(
              p => p.placeId === deliveryLocation.placeId,
            ),
            1,
            deliveryLocation,
          )
        }
      }
    },
    deleteLocations: (
      state,
      { payload: { deliveryLocation } }: DeliveryPayload,
    ) => {
      if (typeof deliveryLocation !== 'undefined') {
        if (deliveryLocation) {
          state.storedLocations?.splice(
            state.storedLocations.findIndex(
              p => p.placeId === deliveryLocation.placeId,
            ),
            1,
          )
        }
      }
    },
    setSelectedCar: (state, { payload: { selectedCar } }: DeliveryPayload) => {
      if (typeof selectedCar !== 'undefined') {
        state.selectedCar = selectedCar
      }
    },
    pushSelectedSevice: (
      state,
      { payload: { selectedService } }: DeliveryPayload,
    ) => {
      if (typeof selectedService !== 'undefined') {
        state.selectedServices?.push(selectedService)
      }
    },
    removeSelectedSevice: (
      state,
      { payload: { selectedService } }: DeliveryPayload,
    ) => {
      if (typeof selectedService !== 'undefined') {
        state.selectedServices?.splice(
          state.selectedServices.findIndex(p => p.id === selectedService.id),
          1,
        )
      }
    },
    /**
     *
     * @param state LocationDetailT
     * @param fitment: đồ đạc, @param quantity: số lượng
     * @returns
     * TODO tìm trong mảng fitment có tồn tại đồ đạc,
     * * nếu số lượng !== 0
     * * nếu mảng chưa có fitment nào thì push vào
     * * nếu mảng đã có thì thay đổi số lượng của fitment đó
     */
    putFitments: (
      state,
      { payload: { fitment, quantity } }: DeliveryPayload,
    ) => {
      if (typeof fitment !== 'undefined' && typeof quantity !== 'undefined') {
        var index = _.findIndex(state.fitments, { id: fitment.id })
        if (quantity !== 0) {
          if (index < 0) {
            state.fitments?.push({ ...fitment, quantity })
            return
          }
          state.fitments?.splice(index, 1, {
            ...fitment,
            quantity: state.fitments[index]?.quantity + quantity,
          })
        }
      }
    },
    setFitments: (state, { payload: { fitments } }: DeliveryPayload) => {
      if (typeof fitments !== 'undefined') {
        state.fitments = fitments.filter(v => v?.quantity && v.quantity !== 0)
      }
    },
    resetFitments: (state, { payload: {} }: DeliveryPayload) => {
      state.fitments = []
    },
    setSortedList: (state, { payload: { sortedList } }: DeliveryPayload) => {
      state.sortedList = sortedList
    },
    reset: state => {
      return {
        ...initialState,
        storedLocations: state.storedLocations,
      }
    },
  },
})

export const {
  setDeliveryTime,
  setIsNow,
  setMyLocation,
  setDeliveryLocation,
  setSelectedLocation,
  setTypeLocation,
  pushReceiveLocation,
  removeReceiveLocation,
  pushStoredLocations,
  updateStoredLocations,
  deleteLocations,
  setSelectedCar,
  pushSelectedSevice,
  putFitments,
  resetFitments,
  removeSelectedSevice,
  setSortedList,
  setFitments,
  reset,
} = slice.actions

export default slice.reducer

export type DeliveryState = {
  date: Date
  isNow: boolean
  myLocation: SelectedLocationT
  deliveryLocation: SelectedLocationT
  selectedLocation: {
    latitude: number
    longitude: number
    placeId: string
  }
  typeLocation: 'DELIVERY' | 'RECEIVE' | 'MYLOCATION' | 'ADD' | 'UPDATE'
  receiveLocations: Record<'temp' | string, SelectedLocationT>
  storedLocations: SelectedLocationT[]
  key: string
  cacheTaxi: Partial<DeliveryState>
  cacheHome: Partial<DeliveryState>
  cache: Partial<DeliveryState>
  selectedCar: SelectedCarT
  selectedService: MapServiceT
  selectedServices: MapServiceT[]
  fitment: FitmentT
  quantity: number
  fitments: FitmentT[]
  sortedList: number[]
}

export type DeliveryPayload = {
  payload: Partial<DeliveryState>
}
