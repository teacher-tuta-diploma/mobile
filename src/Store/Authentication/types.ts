export type AuthenticationT = {
  accessToken: string
  account: AccountT
  refreshToken: string
  credentail: CredentailT
}

export type ChangePasswordT = {
  status: 'ok'
  updated: {
    newPassword: string
    oldPassword: string
  }
}

export type AccountT = {
  address: string
  email: string
  id: number
  name: string
  phone: string
  status: number
  dob: string
  cccd: string
  gender: string
  notify?: boolean
  notifyReceiptNotification?: boolean
}

export type CredentailT = {
  id: number
  key: string
  provider: string
  ref: string
  refId: number
  status: number
}

export type UPloadedLinkT = {
  downloadLink: string
  originalFile: string
}

export type CreateDocT = {
  createdAt: string
  deletedAt: string
  id: number
  status: number
  updatedAt: string
}

export type ResourceT = {
  createdAt: string
  deletedAt: string
  id: number
  updatedAt: string
}

export type DocumentT = {
  document: {
    id: number
    mineType: string
    name: string
    size: number
    status: number
    url: string
  }
  documentId: number
  id: number
  ref: 'guest'
  type: string
  userId: number
}

export type ForgotPasswordT = {
  id: number
  key: string
}

export type VerifyOtpT = {
  id: number
  phone: string
}
