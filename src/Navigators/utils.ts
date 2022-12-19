/**
 * Used to navigating without the navigation prop
 * @see https://reactnavigation.org/docs/navigating-without-navigation-prop/
 *
 * You can add other navigation functions that you need and export them
 */
import { authManager } from '@/Containers/ChatSendBird/Uikit/libs/authentication'
import { GetSendbirdSDK } from '@/Hooks/useSendBird'
import { DeliveryState } from '@/Store/Delivery'
import {
  LocationDetailT,
  SelectedLocationT,
  OrderLocationT,
  OrderT,
  ProductT,
  AdvertisementsT,
} from '@/Store/Delivery/type'
import { User } from '@react-native-google-signin/google-signin'
import {
  CommonActions,
  createNavigationContainerRef,
  Route,
  StackActions,
} from '@react-navigation/native'
import { Profile } from 'react-native-fbsdk-next'
import type { SendbirdChatSDK } from '@sendbird/uikit-utils'
import {
  ExtractParams,
  RouteWithParamsInterface,
} from '@/Containers/CallSendBird/types/navigations'
import AuthManager from '@/Containers/CallSendBird/libs/AuthManager'
import { SendbirdCalls } from '@sendbird/calls-react-native'

export type RootStackParamList = {
  SelectPlace: {
    type: DeliveryState['typeLocation']
  }
  StartScreen: undefined
  Startup: undefined
  Home: undefined
  LoginScreen: undefined
  RegisterSocialScreen: {
    user?: User | Profile
    key: 'google' | 'facebook'
    token: string
  }
  RegisterUserScreen: undefined
  Main: { tab?: 'Home' | 'Order' | 'Notifications' | 'Profile' }
  SelectTime: undefined
  OtpScreen: {
    phone: string
    id: number
    credentialId: number
  }
  RegisterSuccess: { accessToken?: string }
  ProfileUser: undefined
  EditProfileScreen: undefined
  MapViewPicker: {
    typeLocation?: DeliveryState['typeLocation']
    myLocation?: LocationDetailT
    defaultLocation?: SelectedLocationT
  }
  BookingCarByTrip: undefined
  BookingDeliveryCar: undefined
  FurnituresList: undefined
  BookingCar: undefined
  ChangePassword: undefined
  DeliveryHomeOffice: {
    product: ProductT
  }
  AdviseAndSurvey: undefined
  WaitingDetailAdviseTrip: undefined
  OrderSuccess: undefined
  ParamOrderSuccess: {
    header?: string
    title?: string
    content?: string
    orderCode: string
    isNow: boolean
  }
  ConfirmDelivery: {
    distances?: Set<number>
  }
  AdviseSelectCar: undefined
  DetailsOrderCompleted: {
    order: OrderT
  }
  DetailQuotes: {
    order: OrderT
  }
  FitmentListView: {
    order: OrderT
  }
  WaitingDeliveryOrder: {
    order: OrderT
  }
  SigningContractor: {
    order?: OrderT
    refresh?: () => void
  }
  ForgotPassword: undefined
  OtpScreenForgotPassword: undefined
  SetupPassword: undefined
  FollowingMap: {
    orderLocations: OrderLocationT[]
    order?: OrderT
  }
  NewDeliveryOrder: {
    order: OrderT
  }
  CancelDeliveryOrder: {
    order: OrderT
  }
  FailDeliveryOrder: {
    order: OrderT
  }
  WaitingAdviseOrder: {
    order: OrderT
  }
  AdvisedOrder: {
    order: OrderT
  }
  GroupChat: undefined
  ChatScreen: {
    serializedChannel: any
    driverName: string
  }
  CallNavigator: undefined
  VideoCalling: undefined
  VoiceCalling: undefined
  FileViewer: {
    serializedFileMessage: object
    deleteMessage: () => Promise<void>
  }
  HelpCenter: undefined
  SettingScreen: undefined
  CallScreen: {
    isIncomingCall: boolean
  }
  AdvertisementScreen: {
    advertisements: AdvertisementsT
  }
}
interface StaticNavigation<
  Routes extends string,
  RouteWithParams extends RouteWithParamsInterface,
> {
  navigate<Route extends Routes>(
    ...args:
      | [name: Route, params: ExtractParams<Route, RouteWithParams>]
      | [name: Route]
  ): void
  push<Route extends Routes>(
    ...args:
      | [name: Route, params: ExtractParams<Route, RouteWithParams>]
      | [name: Route]
  ): void
  goBack(): void
}

export const navigationRef = createNavigationContainerRef<RootStackParamList>()

export function navigate(name: keyof RootStackParamList, params: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params)
  }
}

export function navigateAndReset(
  routes: Omit<
    Route<keyof RootStackParamList, object | undefined>,
    'key'
  >[] = [],
  index = 0,
) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes,
      }),
    )
  }
}

export function goBack() {
  if (navigationRef.isReady()) {
    navigationRef.goBack()
  }
}

export function navigateAndSimpleReset(
  name: keyof RootStackParamList,
  index = 0,
) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes: [{ name }],
      }),
    )
  }
}

export function reset(
  routeName: keyof RootStackParamList,
  params: { [key: string]: any },
) {
  navigationRef?.dispatch(state => {
    if (state.type === 'tab') {
      const index = state.routeNames.indexOf(routeName)
      //@ts-ignore
      return CommonActions.reset({
        ...state,
        index,
      })
    }
    return CommonActions.reset({
      index: 1,
      routes: [
        {
          name: routeName,
          params,
        },
      ],
    })
  })
}

export const runAfterAppReady = (
  callback: (sdk: SendbirdChatSDK, actions: any) => void,
) => {
  const id = setInterval(async () => {
    if (
      navigationRef.isReady() &&
      authManager.hasAuthentication() &&
      GetSendbirdSDK()
    ) {
      const sdk = GetSendbirdSDK()
      if (sdk.connectionState === 'OPEN') {
        clearInterval(id)
        callback(sdk, {})
      }
    }
  }, 250)
}

export const staticNavigation: StaticNavigation<
  string,
  { route: any; params: any }
> = {
  navigate(name, params) {
    if (navigationRef.isReady()) {
      const currentRoute = navigationRef.getCurrentRoute()
      if (currentRoute?.name === name) {
        navigationRef.dispatch(StackActions.replace(name, params))
      } else {
        navigationRef.navigate(name as keyof RootStackParamList, params)
      }
    }
  },
  push(name, params) {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(StackActions.push(name, params))
    }
  },
  goBack() {
    if (navigationRef.isReady()) {
      navigationRef.goBack()
    }
  },
}

export const RunAfterAppReady = <
  Routes extends string,
  RouteWithParams extends { route: Routes; params: any },
>(
  callback: (navigation: StaticNavigation<Routes, RouteWithParams>) => void,
) => {
  const id = setInterval(async () => {
    if (
      navigationRef.isReady() &&
      AuthManager.isAuthenticated() &&
      SendbirdCalls.currentUser
    ) {
      clearInterval(id)
      callback(staticNavigation)
    }
  }, 250)
}
