import { LoadingGlobalContext } from '@/Provider/LoadingProvider'
import { useContext } from 'react'

const useLoadingGlobal = () => {
  return useContext(LoadingGlobalContext)
}

export default useLoadingGlobal
