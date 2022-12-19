import React, { useCallback, useMemo, useState } from 'react'
import Popup from './components/Popup'

export type PopupGlobalT = {
  status?: boolean
  tooglePopup?: (bool: boolean) => void
  showPopup?: (child: React.ReactNode) => void
}

export const PopupGlobalContext = React.createContext<PopupGlobalT>({})

const PopupGlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [status, setStatus] = useState(false)
  const [child, setChild] = useState<React.ReactNode>()

  const tooglePopup = useCallback((bool: boolean) => {
    setStatus(bool)
  }, [])

  const showPopup = useCallback(
    (c: React.ReactNode) => {
      setChild(c)
      tooglePopup(true)
    },
    [tooglePopup],
  )

  const contextValue = useMemo<PopupGlobalT>(
    () => ({
      status,
      tooglePopup,
      showPopup,
    }),
    [showPopup, status, tooglePopup],
  )
  return (
    <PopupGlobalContext.Provider value={contextValue}>
      {children}
      <Popup
        {...{
          status,
          tooglePopup,
        }}
      >
        {child}
      </Popup>
    </PopupGlobalContext.Provider>
  )
}

export default PopupGlobalProvider
