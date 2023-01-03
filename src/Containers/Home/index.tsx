import React, { useCallback, useEffect } from 'react'
import Container from '@/Components/Container'
import LargeHeader from '@/Components/LargeHeader'
import Commission from './components/Commission'
import Promotion from './components/Promotion'
import PromotionNews from './components/News'
import { ScrollView, Text } from 'react-native'
import { useAsyncEffect, useTheme } from '@/Hooks'
import { ProductT } from '@/Store/Delivery/type'
import {
  useHandleCreateOrderMutation,
  useHandleSetPlayerIdMutation,
} from '@/Services/modules/users'
import { useAppDispatch, useAppSelector } from '@/Hooks/useApp'
import useLoadingGlobal from '@/Hooks/useLoadingGlobal'
import { useConnection, useSendbirdChat } from '../ChatSendBird/Uikit'
import { ACCOUNT_META, ACCOUNT_METADATA_KEY } from '@/Store/Delivery/enum'
import { setReceivedNotification } from '@/Store/Message'
import useCall from '@/Hooks/useCall'
import AuthManager from '../CallSendBird/libs/AuthManager'
import Advertisements from './components/Advertisements'

const Home = () => {
  const { MetricsSizes, Colors } = useTheme()
  const loading = useLoadingGlobal()
  const dispatch = useAppDispatch()
  const callHook = useCall()
  const { account } = useAppSelector(state => state.authentication)
  const { deviceState } = useAppSelector(state => state.message)
  const [handleCreateOrder] = useHandleCreateOrderMutation({
    fixedCacheKey: 'createOrders',
  })
  const [handleSetPlayerId, propsSetPlayerId] = useHandleSetPlayerIdMutation({
    fixedCacheKey: 'playerId',
  })
  const { connect } = useConnection()
  const { currentUser } = useSendbirdChat()

  const onPressProduct = useCallback(
    (product: ProductT) => {
      handleCreateOrder({
        serviceId: product.id,
      })
      dispatch(
        setReceivedNotification({
          notificationPusherData: undefined,
        }),
      )
    },
    [dispatch, handleCreateOrder],
  )

  /**
   * TODO : nếu có player id thì update lên server
   */
  useEffect(() => {
    if (deviceState?.userId) {
      handleSetPlayerId({
        player_id: deviceState?.userId ?? '',
      })
    }
  }, [deviceState?.userId, handleSetPlayerId])

  useEffect(() => {
    loading.toogleLoading?.(propsSetPlayerId.isLoading)
  }, [loading, propsSetPlayerId.isLoading])

  useEffect(() => {
    return () => {
      propsSetPlayerId.reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useAsyncEffect(async () => {
    if (!currentUser && account) {
      try {
        console.log(
          '🛠 LOG: 🚀 --> --------------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
        )
        console.log(
          '🛠 LOG: 🚀 --> ~ file: index.tsx ~ line 65 ~ useAsyncEffect ~ currentUser',
          account,
        )
        console.log(
          '🛠 LOG: 🚀 --> --------------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
        )
        const data = await connect(`guest_${account.id}`, {
          nickname: account.name,
        })
        if (!(data.metaData as any)[ACCOUNT_METADATA_KEY.ROLES]) {
          await data.createMetaData({
            [ACCOUNT_METADATA_KEY.ROLES]: ACCOUNT_META.CUSTOMER,
          })
        }
        console.log(
          '🛠 LOG: 🚀 --> ------------------------------------------------------------------------🛠 LOG: 🚀 -->',
        )
        console.log(
          '🛠 LOG: 🚀 --> ~ file: index.tsx ~ line 66 ~ useAsyncEffect ~ data',
          data,
        )
        console.log(
          '🛠 LOG: 🚀 --> ------------------------------------------------------------------------🛠 LOG: 🚀 -->',
        )
      } catch (error) {
        console.log(
          '🛠 LOG: 🚀 --> --------------------------------------------------------------------------🛠 LOG: 🚀 -->',
        )
        console.log(
          '🛠 LOG: 🚀 --> ~ file: index.tsx ~ line 94 ~ useAsyncEffect ~ error',
          error,
        )
        console.log(
          '🛠 LOG: 🚀 --> --------------------------------------------------------------------------🛠 LOG: 🚀 -->',
        )
      }
    }
  }, [account?.name, account?.phone, connect, currentUser])

  useAsyncEffect(async () => {
    if (account) {
      try {
        console.log(
          '🛠 LOG: 🚀 --> ------------------------------------------------------------------------🛠 LOG: 🚀 -->',
        )
        console.log(
          '🛠 LOG: 🚀 --> ~ file: index.tsx:122 ~ useAsyncEffect ~ account',
          account,
        )
        console.log(
          '🛠 LOG: 🚀 --> ------------------------------------------------------------------------🛠 LOG: 🚀 -->',
        )
        const credential = await AuthManager.getSavedCredential()
        if (credential) {
          callHook.onSigin?.(credential)
        } else {
          callHook.onSigin?.({
            userId: `guest_${account.id}`,
          })
        }
      } catch (error) {
        console.log(
          '🛠 LOG: 🚀 --> --------------------------------------------------------------------🛠 LOG: 🚀 -->',
        )
        console.log(
          '🛠 LOG: 🚀 --> ~ file: index.tsx:136 ~ useAsyncEffect ~ error',
          error,
        )
        console.log(
          '🛠 LOG: 🚀 --> --------------------------------------------------------------------🛠 LOG: 🚀 -->',
        )
      }
    }
  }, [account])

  return (
    <Container>
      <Text>asdda</Text>
    </Container>
  )
}

export default Home
