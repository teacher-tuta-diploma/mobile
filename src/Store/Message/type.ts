export type NotificationT = {
  id: number
  status: string
  createdAt: string
  updatedAt: string
  ref: 'guest'
  refId: number
  title: string
  content: {
    code: string
  }
}

export type NotificationDataT = {
  type: 'NOTIFICATION'
  to: ''
  playerIds: string[]
  template: string
  message: string
  data: Record<string, any>
  params?: Record<string, any>
}
