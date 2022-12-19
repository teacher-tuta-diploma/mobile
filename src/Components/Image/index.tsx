import React, { FC, memo, ReactNode } from 'react'
import FastImage, { FastImageProps } from 'react-native-fast-image'
import AutoHeightImage from 'react-native-auto-height-image'
import {
  ImageStyle,
  StyleSheet,
  Image as ImageReact,
  ImagePropsBase,
  Platform,
} from 'react-native'

export type ImageProps = (FastImageProps & ImagePropsBase) & {
  children?: ReactNode
  type?: 'background' | 'gif'
  width?: number
  isNotFast?: boolean
  w?: ImageStyle['width']
  h?: ImageStyle['height']
  ml?: ImageStyle['marginLeft']
  mr?: ImageStyle['marginRight']
  mt?: ImageStyle['marginTop']
  mb?: ImageStyle['marginBottom']
  mv?: ImageStyle['marginVertical']
  mh?: ImageStyle['marginHorizontal']
  pl?: ImageStyle['paddingLeft']
  pr?: ImageStyle['paddingRight']
  pt?: ImageStyle['paddingTop']
  pb?: ImageStyle['paddingBottom']
  pv?: ImageStyle['paddingVertical']
  ph?: ImageStyle['paddingHorizontal']
  jc?: ImageStyle['justifyContent']
  ai?: ImageStyle['alignItems']
  br?: ImageStyle['borderRadius']
  as?: ImageStyle['alignSelf']
  bg?: ImageStyle['backgroundColor']
}

const Image: FC<ImageProps> = ({
  source,
  style,
  tintColor,
  children,
  type,
  width = 0,
  isNotFast = false,
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
  as,
  br,
  jc,
  ai,
  bg,
  ...other
}) => {
  const styles = StyleSheet.flatten([
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
    br !== undefined && { borderRadius: br },
    as !== undefined && { alignSelf: as },
    bg !== undefined && { backgroundColor: bg },
  ]) as any
  if (type === 'background') {
    return (
      <FastImage
        source={source}
        style={[style, styles]}
        tintColor={tintColor}
        {...other}
      >
        {children}
      </FastImage>
    )
  } else if (type === 'gif') {
    return (
      <FastImage
        source={source}
        style={[style, styles]}
        resizeMode="contain"
        {...other}
      />
    )
  } else if (Platform.OS === 'android' && isNotFast) {
    return (
      <ImageReact
        source={source}
        style={[style, styles]}
        resizeMode="contain"
        {...other}
      />
    )
  } else {
    if (width) {
      return (
        // @ts-ignore
        <AutoHeightImage
          width={width}
          source={source as number}
          style={[style, styles, { tintColor: tintColor }]}
          {...other}
        />
      )
    } else {
      return (
        <FastImage
          source={source}
          tintColor={tintColor}
          style={[style, styles]}
          {...other}
        />
      )
    }
  }
}

export default memo(Image)
