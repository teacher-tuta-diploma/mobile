import type { FC } from 'react'
import React from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { ContainerProps } from './types'

const Container: FC<ContainerProps> = ({
  children,
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
  br,
  bw,
  bc,
  flex,
  flexDr,
  bg,
  overflow,
  ...other
}) => {
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
    bw !== undefined && { borderWidth: bw },
    bc !== undefined && { borderColor: bc },
    as !== undefined && { alignSelf: as },
    overflow !== undefined && { overflow: overflow },
    other.position !== undefined && { position: other.position },
    other.top !== undefined && { top: other.top },
    other.bottom !== undefined && { bottom: other.bottom },
    other.left !== undefined && { left: other.left },
    other.right !== undefined && { right: other.right },
  ]) as ViewStyle
  return (
    <>
      {children ? (
        <View {...other} style={[styles, other.style]}>
          {children}
        </View>
      ) : (
        <View {...other} style={[styles, other.style]} />
      )}
    </>
  )
}

export default Container
