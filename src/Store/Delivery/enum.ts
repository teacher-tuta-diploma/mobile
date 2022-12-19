export enum LocationTypeE {
  DELIVERY = 1,
  RECEIVE = 0,
}

export enum SortLocationT {
  DELIVERY = 1,
}
export enum PickupTypeE {
  NOW = 0,
  BOOKING = 1,
}

export enum StatusOrderE {
  'Bản nháp' = <number>0,
  'Chuyến hàng mới' = <number>1,
  'Chờ tư vấn' = <number>2,
  'Đã tư vấn' = <number>3,
  'Tài xế đang đến' = <number>4,
  'Tài xế đã đến' = <number>5,
  'Đang giao hàng' = <number>6,
  'Hoàn thành' = <number>7,
  'Hủy' = <number>8,
  'Thất bại' = <number>9,
  'Đã có tài xế' = <number>10,
}

export enum MyOrderE {
  INPROGRESS = 0,
  WATING = 1,
  FINISHED = 2,
}

export enum ChargeTypeE {
  'Trả phí theo app' = <number>0,
  'Trả phí theo đồng hồ taximet' = <number>1,
}

export enum FeeE {
  TAX = 'TAX',
  PROMO = 'PRM',
  VC = 'VC',
  FTM = 'FTM',
}

export enum NameFeeE {
  'VC' = 'Cước vận chuyển',
  'PRM' = 'Khuyến mãi',
  'TAX' = 'Thuế VAT',
  'PAK' = 'Phí neo xe',
  'OVN' = 'Qua đêm',
  'EXT' = 'Phí phụ trội',
  'RTN' = 'Phí chiều về',
  'RTF' = 'Phí giao thông đường bộ',
  'MSB' = 'Phí xe đi ngoại tỉnh miền núi',
  'FTM' = 'Phí đồ đạc',
}

export enum OrderCancelReasonsE {
  'Tài xế đến muộn' = 0,
  'Không có nhu cầu nữa' = 1,
  'Có việc bận đột xuất' = 2,
  'Thời tiết không phù hợp' = 3,
  'Lý do khác' = 4,
}

export enum SelectionTypeE {
  SELF = 0,
  SURVEY = 1,
}

export enum ACCOUNT_META {
  CUSTOMER = 'CUSTOMER',
  DRIVER = 'DRIVER',
  ADMIN = 'ADMIN',
}

export enum ACCOUNT_METADATA_KEY {
  ROLES = 'ROLES',
}

export enum CHANNEL_METADATA_KEY {
  ROLES_TYPE = 'ROLES_TYPE',
}

export enum CHANNEL_ROLES_TYPE {
  ADMIN_CUSTOMER = 'ADMIN_CUSTOMER',
  ADMIN_DRIVER = 'ADMIN_DRIVER',
  DRIVER_CUSTOMER = 'DRIVER_CUSTOMER',
  ADMIN_ADMIN = 'ADMIN_ADMIN',
}

export enum PaymentE {
  'Thanh toán sử dụng tiền mặt' = 0,
  'Thanh toán sử dụng VNPAY' = 1,
}

export enum HotLineAreaE {
  HANOI = 'HANOI',
  HCM = 'HCM',
  FREE = 'FREE',
}
