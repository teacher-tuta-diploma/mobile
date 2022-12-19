import { alertMessage } from '@/Config/alert.helper'
import { useConnection } from '@/Containers/ChatSendBird/Uikit'
import { useAppDispatch, useAppSelector } from '@/Hooks/useApp'
import { STATUS_API } from '@/Services/api'
import { reset } from '@/Store/Authentication'
import React, { useEffect, useMemo, useRef, useState } from 'react'

export type AlertMessageT = {
  message?: string
  alertMessage?: (message: string) => void
}

export const AlertMessageContext = React.createContext<AlertMessageT>({})

const AlertMessageProvider = ({ children }: { children: React.ReactNode }) => {
  const [message, setMessage] = useState<{ message: string; status: number }>()
  const isShow = useRef<boolean>(false)
  const { disconnect } = useConnection()

  console.log(
    '🛠 LOG: 🚀 --> --------------------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
  )
  console.log(
    '🛠 LOG: 🚀 --> ~ file: AlertProvider.tsx ~ line 16 ~ AlertMessageProvider ~ message',
    message,
    isShow.current,
  )
  console.log(
    '🛠 LOG: 🚀 --> --------------------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
  )
  const { messageError } = useAppSelector(state => state.global)
  const dispatch = useAppDispatch()

  const contextValue = useMemo<AlertMessageT>(() => ({}), [])

  useEffect(() => {
    if (!message && !isShow.current) {
      setMessage(messageError)
    }
  }, [message, messageError])

  useEffect(() => {
    if (message) {
      isShow.current = true

      if (message.status === STATUS_API.UN_AUTHORIZE) {
        alertMessage('Lỗi', message.message, false, () => {
          dispatch(reset())
          disconnect()
          setMessage(undefined)
        })
      } else if (message.status !== STATUS_API.SUCCESS) {
        alertMessage('Lỗi', message.message, false, () => {
          setMessage(undefined)
          setTimeout(() => {
            isShow.current = false
          }, 1000)
        })
      }
    }
  }, [disconnect, dispatch, message])

  return (
    <AlertMessageContext.Provider value={contextValue}>
      {children}
    </AlertMessageContext.Provider>
  )
}

export default AlertMessageProvider
