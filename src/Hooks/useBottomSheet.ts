import { BottomSheetContext } from '@/Provider/BottomSheeetProvider'
import { useContext } from 'react'

const useBottomSheet = () => {
  return useContext(BottomSheetContext)
}

export default useBottomSheet
