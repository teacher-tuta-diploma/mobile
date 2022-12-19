import { Alert } from 'react-native'

export function alertMessage(
  message: string,
  content = '',
  noButton?: boolean,
  onPress?: () => void,
) {
  setTimeout(() => {
    Alert.alert(
      message,
      content,
      noButton
        ? []
        : [
            {
              text: 'OK',
              onPress: onPress,
            },
          ],
    )
  }, 0)
}

export function alertError(content = '', noButton?: boolean, onPress?: any) {
  setTimeout(() => {
    Alert.alert(
      'Cảnh báo ⚠️',
      content,
      noButton
        ? []
        : [
            {
              text: 'OK',
              onPress: onPress,
            },
          ],
    )
  }, 0)
}

export const confirm = (
  title: string,
  message: string,
  onOk: () => void,
  ok?: string,
  cancel?: string,
) => {
  Alert.alert(title, message, [
    { text: cancel || 'Cancel', onPress: () => {}, style: 'cancel' },
    { text: ok || 'OK', onPress: onOk },
  ])
}
