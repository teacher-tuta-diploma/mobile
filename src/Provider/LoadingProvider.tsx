import React, { useCallback, useMemo, useRef, useState } from 'react'
import Loading from './components/Loading'

export type LoadingGlobalT = {
  status?: boolean
  toogleLoading?: (bool: boolean, nameSpace?: string) => void
}

export const LoadingGlobalContext = React.createContext<LoadingGlobalT>({})

const LoadingGlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [status, setStatus] = useState(false)
  const nameSpaceRef = useRef<string | undefined>('')

  const toogleLoading = useCallback(
    (bool: boolean, nameSpace?: string) => {
      if (!status) {
        setStatus(bool)
        nameSpaceRef.current = nameSpace
      } else {
        if (nameSpaceRef.current === nameSpace) {
          setStatus(bool)
        }
      }
    },
    [status],
  )

  const contextValue = useMemo<LoadingGlobalT>(
    () => ({
      status,
      toogleLoading,
    }),
    [status, toogleLoading],
  )
  return (
    <LoadingGlobalContext.Provider value={contextValue}>
      {children}
      {status ? <Loading /> : null}
    </LoadingGlobalContext.Provider>
  )
}

export default LoadingGlobalProvider
