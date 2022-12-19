import React, { forwardRef, Ref } from 'react'
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native'
import { TouchableProps } from './types'

export const Touchable = forwardRef(
  (
    {
      children,
      style,
      handleSubmit,
      onPress,
      hitSlopRange = 10,
      w,
      h,
      ml,
      mr,
      mt,
      mb,
      mv,
      mh,
      pl,
      pr,
      pt,
      pb,
      pv,
      ph,
      jc,
      ai,
      as,
      flex,
      flexDr,
      bg,
      br,
      bw,
      bc,
      ...props
    }: TouchableProps,
    ref?: Ref<TouchableOpacity>,
  ) => {
    const styles = StyleSheet.flatten([
      flex !== undefined && { flex },
      flexDr !== undefined && { flexDirection: flexDr },
      w !== undefined && { width: w },
      h !== undefined && { height: h },
      ml !== undefined && { marginLeft: ml },
      mr !== undefined && { marginRight: mr },
      mt !== undefined && { marginTop: mt },
      mb !== undefined && { marginBottom: mb },
      mh !== undefined && { marginHorizontal: mh },
      mv !== undefined && { marginVertical: mv },
      pl !== undefined && { paddingLeft: pl },
      pr !== undefined && { paddingRight: pr },
      pt !== undefined && { paddingTop: pt },
      pb !== undefined && { paddingBottom: pb },
      ph !== undefined && { paddingHorizontal: ph },
      pv !== undefined && { paddingVertical: pv },
      jc !== undefined && { justifyContent: jc },
      ai !== undefined && { alignItems: ai },
      bg !== undefined && { backgroundColor: bg },
      br !== undefined && { borderRadius: br },
      as !== undefined && { alginSelf: as },
      bw !== undefined && { borderWidth: bw },
      bc !== undefined && { borderColor: bc },
    ]) as ViewStyle
    return (
      <TouchableOpacity
        ref={ref}
        hitSlop={{
          top: hitSlopRange,
          left: hitSlopRange,
          bottom: hitSlopRange,
          right: hitSlopRange,
        }}
        activeOpacity={0.8}
        style={[style, styles]}
        onPress={handleSubmit || onPress}
        {...props}
      >
        {children}
      </TouchableOpacity>
    )
  },
)
