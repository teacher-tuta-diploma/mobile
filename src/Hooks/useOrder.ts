import { OrderContext } from '@/Provider/OrderProvider'
import { useContext } from 'react'

const useOrder = () => {
  return useContext(OrderContext)
}

export default useOrder
