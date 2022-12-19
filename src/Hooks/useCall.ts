import { CallContext } from '@/Provider/CallProvider'
import { useContext } from 'react'

const useCall = () => {
  return useContext(CallContext)
}

export default useCall
