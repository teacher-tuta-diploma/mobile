import {
  api,
  apiAccount,
  apiDocument,
  apiFee,
  apiMap,
  apiMapServer,
  apiMessage,
  apiOrder,
  apiProduct,
  apiSystem,
  apiVehicle,
  apiNews,
} from '@/Services/api'
import {
  handleActiveUser,
  handleForgotPassword,
  handleLogin,
  handleLoginSocial,
  handleRegisterSocial,
  handleRegisterUser,
  handleResendVerifyOtp,
  handleSetNewPassword,
  handleSetPlayerId,
  handleVerifyOtp,
  handleChangePhoneOtp,
} from './authentication'
import {
  handleChangePassword,
  handleGetInfo,
  handleGetInfoDriver,
  handleUpdateInfo,
  handleDisableUser,
  handleUpdateSettingGeneral,
} from './account'
import fetchOne from './fetchOne'
import { handleGetDistance, handleGetMyLocation } from './delivery'
import {
  handleGetGroupFitment,
  handleGetGroupFitments,
  handleGetProduct,
} from './product'
import {
  handlDeleteOrderLocation,
  handleBookingOrder,
  handleChoiceCarForOrder,
  handleChoiceFitmentForOrder,
  handleChoiceServiceForOrder,
  handleCreateOrder,
  handleCreateOrderLocation,
  handleGetListOrder,
  handleGetOrderByCode,
  handleGetOrderDetail,
  handlePutFeeForOrder,
  handlUpdateOrderLocation,
  handleCancelOrder,
  handlePutTimeForOrder,
  handleCreateBills,
  handleCreateEvaluateOrder,
  handleGetEvaluateSetting,
  handleBookingSurveyOrder,
  handlUpdateOrderContract,
  handleGetFirstOrder,
} from './order'
import {
  handleGetDocument,
  handleLinkFile,
  handleUploadFile,
  handleUploadBase64,
} from './document'
import { handleGetVehicle, handleGetVehicleDetail } from './veihicle'
import {
  handleGetPaymentMethod,
  handleGetVideoConfig,
  handleGetAdvertisements,
  handleGetWorkingAreaById,
  handleGetHotline,
} from './system'
import {
  handleExpectedFee,
  handletransportFee,
  handleGetPromotionList,
  handleGetPaymentVNP,
} from './fee'
import { handleGetNews } from './news'
import { handleGetListNotification } from './message'

export const authApi = api.injectEndpoints({
  endpoints: build => ({
    fetchOne: fetchOne(build),
    handleLogin: handleLogin(build),
    handleLoginSocial: handleLoginSocial(build),
    handleRegisterSocial: handleRegisterSocial(build),
    handleRegisterUser: handleRegisterUser(build),
    handleVerifyOtp: handleVerifyOtp(build),
    handleActiveUser: handleActiveUser(build),
    handleForgotPassword: handleForgotPassword(build),
    handleResendVerifyOtp: handleResendVerifyOtp(build),
    handleChangePhoneOtp: handleChangePhoneOtp(build),
    handleSetNewPassword: handleSetNewPassword(build),
  }),
  overrideExisting: true,
})

export const accountApi = apiAccount.injectEndpoints({
  endpoints: build => ({
    handleUpdateInfo: handleUpdateInfo(build),
    handleGetInfo: handleGetInfo(build),
    handleChangePassword: handleChangePassword(build),
    handleSetPlayerId: handleSetPlayerId(build),
    handleGetInfoDriver: handleGetInfoDriver(build),
    handleDisableUser: handleDisableUser(build),
    handleUpdateSettingGeneral: handleUpdateSettingGeneral(build),
  }),
  overrideExisting: true,
})

export const mapApi = apiMap.injectEndpoints({
  endpoints: build => ({
    handleGetMyLocation: handleGetMyLocation(build),
  }),
  overrideExisting: true,
})

export const mapApiServer = apiMapServer.injectEndpoints({
  endpoints: build => ({
    handleGetDistance: handleGetDistance(build),
  }),
  overrideExisting: true,
})

export const productApi = apiProduct.injectEndpoints({
  endpoints: build => ({
    handleGetProduct: handleGetProduct(build),
    handleGetGroupFitment: handleGetGroupFitment(build),
    handleGetGroupFitments: handleGetGroupFitments(build),
  }),
  overrideExisting: true,
})

export const orderApi = apiOrder.injectEndpoints({
  endpoints: build => ({
    handleCreateOrder: handleCreateOrder(build),
    handlUpdateOrderLocation: handlUpdateOrderLocation(build),
    handleGetOrderByCode: handleGetOrderByCode(build),
    handleCreateOrderLocation: handleCreateOrderLocation(build),
    handleChoiceCarForOrder: handleChoiceCarForOrder(build),
    handleChoiceServiceForOrder: handleChoiceServiceForOrder(build),
    handleChoiceFitmentForOrder: handleChoiceFitmentForOrder(build),
    handleGetOrderDetail: handleGetOrderDetail(build),
    handleBookingOrder: handleBookingOrder(build),
    handleBookingSurveyOrder: handleBookingSurveyOrder(build),
    handleGetListOrder: handleGetListOrder(build),
    handleCancelOrder: handleCancelOrder(build),
    handlDeleteOrderLocation: handlDeleteOrderLocation(build),
    handlePutFeeForOrder: handlePutFeeForOrder(build),
    handlePutTimeForOrder: handlePutTimeForOrder(build),
    handleCreateBills: handleCreateBills(build),
    handleCreateEvaluateOrder: handleCreateEvaluateOrder(build),
    handleGetEvaluateSetting: handleGetEvaluateSetting(build),
    handlUpdateOrderContract: handlUpdateOrderContract(build),
    handleGetFirstOrder: handleGetFirstOrder(build),
  }),
  overrideExisting: true,
})

export const documentApi = apiDocument.injectEndpoints({
  endpoints: build => ({
    handleUploadFile: handleUploadFile(build),
    handleLinkFile: handleLinkFile(build),
    handleGetDocument: handleGetDocument(build),
    handleUploadBase64: handleUploadBase64(build),
  }),
  overrideExisting: true,
})

export const vehicleApi = apiVehicle.injectEndpoints({
  endpoints: build => ({
    handleGetVehicle: handleGetVehicle(build),
    handleGetVehicleDetail: handleGetVehicleDetail(build),
  }),
  overrideExisting: true,
})

export const systemApi = apiSystem.injectEndpoints({
  endpoints: build => ({
    handleGetPaymentMethod: handleGetPaymentMethod(build),
    handleGetVideoConfig: handleGetVideoConfig(build),
    handleGetAdvertisements: handleGetAdvertisements(build),
    handleGetWorkingAreaById: handleGetWorkingAreaById(build),
    handleGetHotline: handleGetHotline(build),
  }),
  overrideExisting: true,
})

export const newsApi = apiNews.injectEndpoints({
  endpoints: build => ({
    handleGetNews: handleGetNews(build),
  }),
  overrideExisting: true,
})

export const feeApi = apiFee.injectEndpoints({
  endpoints: build => ({
    handleExpectedFee: handleExpectedFee(build),
    handletransportFee: handletransportFee(build),
    handleGetPromotionList: handleGetPromotionList(build),
    handleGetPaymentVNP: handleGetPaymentVNP(build),
  }),
  overrideExisting: true,
})

export const messageApi = apiMessage.injectEndpoints({
  endpoints: build => ({
    handleGetListNotification: handleGetListNotification(build),
  }),
  overrideExisting: true,
})

export const {
  useLazyFetchOneQuery,
  useHandleLoginMutation,
  useHandleLoginSocialMutation,
  useHandleRegisterSocialMutation,
  useHandleRegisterUserMutation,
  useHandleVerifyOtpMutation,
  useHandleActiveUserMutation,
  useHandleForgotPasswordMutation,
  useHandleResendVerifyOtpMutation,
  useHandleSetNewPasswordMutation,
  useHandleChangePhoneOtpMutation,
} = authApi

export const {
  useHandleUpdateInfoMutation,
  useLazyHandleGetInfoQuery,
  useHandleGetInfoQuery,
  useHandleChangePasswordMutation,
  useHandleSetPlayerIdMutation,
  useHandleGetInfoDriverQuery,
  useLazyHandleGetInfoDriverQuery,
  useHandleDisableUserMutation,
  useHandleUpdateSettingGeneralMutation,
} = accountApi

export const { useLazyHandleGetMyLocationQuery, useHandleGetMyLocationQuery } =
  mapApi

export const { useHandleGetDistanceMutation } = mapApiServer

export const {
  useHandleGetDocumentQuery,
  useHandleLinkFileMutation,
  useHandleUploadFileMutation,
  useHandleUploadBase64Mutation,
} = documentApi

export const {
  useHandleGetProductQuery,
  useHandleGetGroupFitmentQuery,
  useHandleGetGroupFitmentsQuery,
} = productApi

export const {
  useHandleCreateOrderMutation,
  useLazyHandleGetOrderByCodeQuery,
  useHandleGetOrderByCodeQuery,
  useHandleCreateOrderLocationMutation,
  useHandleChoiceCarForOrderMutation,
  useHandleChoiceServiceForOrderMutation,
  useHandleChoiceFitmentForOrderMutation,
  useHandleGetOrderDetailQuery,
  useLazyHandleGetOrderDetailQuery,
  useHandleBookingOrderMutation,
  useHandleBookingSurveyOrderMutation,
  useHandleGetListOrderQuery,
  useHandlUpdateOrderLocationMutation,
  useHandleCancelOrderMutation,
  useHandlDeleteOrderLocationMutation,
  useHandlePutFeeForOrderMutation,
  useHandlePutTimeForOrderMutation,
  useHandleCreateBillsMutation,
  useHandleCreateEvaluateOrderMutation,
  useHandleGetEvaluateSettingQuery,
  useHandlUpdateOrderContractMutation,
  useHandleGetFirstOrderQuery,
} = orderApi

export const {
  useHandleGetVehicleQuery,
  useLazyHandleGetVehicleQuery,
  useHandleGetVehicleDetailQuery,
  useLazyHandleGetVehicleDetailQuery,
} = vehicleApi

export const {
  useHandleGetPaymentMethodQuery,
  useHandleGetVideoConfigQuery,
  useHandleGetAdvertisementsQuery,
  useHandleGetWorkingAreaByIdQuery,
  useHandleGetHotlineQuery,
} = systemApi

export const {
  useHandleExpectedFeeMutation,
  useHandletransportFeeMutation,
  useHandleGetPromotionListQuery,
  useHandleGetPaymentVNPQuery,
  useLazyHandleGetPaymentVNPQuery,
} = feeApi

export const { useHandleGetNewsQuery } = newsApi

export const { useHandleGetListNotificationQuery } = messageApi
