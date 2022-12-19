import { PopupGlobalContext } from '@/Provider/PopupProvider'
import { useContext } from 'react'

const usePopupGlobal = () => {
  return useContext(PopupGlobalContext)
}

export default usePopupGlobal
