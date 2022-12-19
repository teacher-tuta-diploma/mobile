import { GeolocationContext } from '@/Provider/GeolocationProvider'
import { useContext } from 'react'

const useGeolocation = () => {
  return useContext(GeolocationContext)
}

export default useGeolocation
