import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from 'react-native-keyboard-aware-scroll-view'
import React from 'react'

type Props = { children: any } & KeyboardAwareScrollViewProps

const KeyboardScrollView = ({ children, ...props }: Props) => {
  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      keyboardShouldPersistTaps={'handled'}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      {...props}
    >
      {children}
    </KeyboardAwareScrollView>
  )
}

export default KeyboardScrollView
