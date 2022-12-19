import React, { memo, useCallback, useMemo } from 'react'
import {
  Dimensions,
  NativeSyntheticEvent,
  Platform,
  StyleSheet,
  Text,
  TextInputSubmitEditingEventData,
} from 'react-native'
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Region,
  Details,
  Animated,
  AnimatedRegion,
  Callout,
  MapMarker,
} from 'react-native-maps'
import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from 'react-native-google-places-autocomplete'
import Config from 'react-native-config'
import { useStyleMapComponent } from './style'
import Container from '../Container'
import Image from '../Image'
import { useTheme } from '@/Hooks'
import { Touchable } from '../Touchable'
import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'
import { useRef } from 'react'
import useGeolocation from '@/Hooks/useGeolocation'
import CenterMarker from './components/CenterMarker'
import MapViewDirections, {
  MapDirectionsResponse,
} from 'react-native-maps-directions'
import { SenderReceiverT, VehicleT } from '@/Store/Delivery/type'
import AnimatedRing from '../Ring'

export type Coord = { latitude: number; longitude: number }

export const MapComponent = memo(
  ({
    coords,
    onPress,
    onRegionChangeComplete,
    hasSearch = true,
    enableDrag = true,
    onSubmitEditing,
    valueTextSearch,
    originLocation,
    destinationLocation,
    waypoints,
    followingMarkers,
  }: {
    coords?: Coord
    onPress?: (data: GooglePlaceData, detail: GooglePlaceDetail | null) => void
    onRegionChangeComplete?: (region: Region, details: Details) => void
    hasSearch?: boolean
    enableDrag?: boolean
    onSubmitEditing?: (
      e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
    ) => void
    valueTextSearch?: string
    originLocation?: SenderReceiverT
    destinationLocation?: SenderReceiverT
    waypoints?: SenderReceiverT[]
    followingMarkers?: VehicleT[]
  }) => {
    const styles = useStyleMapComponent()
    const { Images, MetricsSizes, Colors } = useTheme()
    const navigation = useNavigation()
    const geolocation = useGeolocation()
    const searchRef = useRef<GooglePlacesAutocompleteRef>()
    const animatedMarker = useRef<MapMarker>(null)
    const boundingBox = {
      southWest: {
        latitude: '24.234631',
        longitude: '89.907127',
      },
      northEast: {
        latitude: '24.259769',
        longitude: '89.934692',
      },
    }

    const { width, height } = Dimensions.get('window')
    const ASPECT_RATIO = width / height

    const northeastLat = parseFloat(boundingBox.northEast.latitude)
    const southwestLat = parseFloat(boundingBox.southWest.latitude)
    const latDelta = northeastLat - southwestLat
    const lngDelta = latDelta * ASPECT_RATIO

    const animatedFollowingMarker = useMemo(
      () =>
        followingMarkers
          ? followingMarkers?.map(
              m =>
                new AnimatedRegion({
                  latitude: +(m.lastLat ?? 0),
                  longitude: +(m.lastLng ?? 0),
                  longitudeDelta: lngDelta,
                  latitudeDelta: latDelta,
                }),
            )
          : [],
      [followingMarkers, latDelta, lngDelta],
    )

    const mapRef = useRef<MapView>()
    // const homePlace = {
    //   description: 'Home',
    //   geometry: { location: { lat: 48.8152937, lng: 2.4597668 } },
    // }
    // const workPlace = {
    //   description: 'Work',
    //   geometry: { location: { lat: 48.8496818, lng: 2.2940881 } },
    // }

    const handleAnimatedmarker = useCallback(() => {
      followingMarkers?.map((coord, index) => {
        const newCoordinate = coord

        if (Platform.OS === 'android') {
          animatedMarker.current?.animateMarkerToCoordinate(
            newCoordinate as any,
            15000,
          )
        } else {
          animatedFollowingMarker[index]
            .timing({
              latitude: +newCoordinate.lastLat,
              longitude: +newCoordinate.lastLng,
              latitudeDelta: latDelta,
              longitudeDelta: lngDelta,
              useNativeDriver: false,
              duration: 2000,
              toValue: { x: 0, y: 0 },
            })
            .start()
        }
      })
    }, [animatedFollowingMarker, followingMarkers, latDelta, lngDelta])

    const focusSearch = useCallback(() => {
      searchRef.current?.focus()
    }, [])

    const onReady = useCallback(
      (result: MapDirectionsResponse) => {
        console.log(
          '🛠 LOG: 🚀 --> ------------------------------------------------------------🛠 LOG: 🚀 -->',
        )
        console.log(
          '🛠 LOG: 🚀 --> ~ file: index.tsx ~ line 121 ~ result',
          result,
        )
        console.log(
          '🛠 LOG: 🚀 --> ------------------------------------------------------------🛠 LOG: 🚀 -->',
        )
        mapRef.current?.fitToCoordinates(result.coordinates, {
          edgePadding: {
            right: width / 10,
            bottom: height / 10,
            left: width / 10,
            top: height / 10,
          },
        })
      },
      [height, width],
    )

    useEffect(() => {
      if (followingMarkers?.length) {
        setTimeout(() => {
          handleAnimatedmarker()
        }, 1000)
      }
    }, [followingMarkers, handleAnimatedmarker])

    useEffect(() => {
      if (valueTextSearch) {
        searchRef.current?.setAddressText(valueTextSearch)
      }
      // searchRef.current?.focus()
    }, [valueTextSearch])

    useEffect(() => {
      if (coords) {
        setTimeout(() => {
          mapRef.current?.animateToRegion(
            {
              latitude: coords.latitude,
              latitudeDelta: lngDelta / 10,
              longitude: coords.longitude,
              longitudeDelta: latDelta / 10,
            },
            1000,
          )
        }, 0)
      }
    }, [coords, coords?.latitude, coords?.longitude, latDelta, lngDelta])

    const origin = useMemo(() => {
      return originLocation
        ? {
            ...originLocation,
            latitude: +originLocation.latitude,
            longitude: +originLocation.longitude,
          }
        : {
            latitude: 20.988797656889112,
            longitude: 105.81150949001312,
            address: 'origin',
          }
    }, [originLocation])

    const destination = useMemo(() => {
      return destinationLocation
        ? {
            ...destinationLocation,
            latitude: +destinationLocation.latitude,
            longitude: +destinationLocation.longitude,
          }
        : {
            latitude: 21.00807879037535,
            longitude: 105.82195535302162,
            address: 'destination',
          }
    }, [destinationLocation])

    return (
      <Container flex={1} ai="center" jc="center">
        <Touchable onPress={navigation.goBack} style={styles.back}>
          <Image
            source={Images.back}
            w={MetricsSizes.small}
            h={MetricsSizes.small}
            resizeMode="contain"
          />
        </Touchable>
        {hasSearch ? (
          <Container style={styles.container}>
            <GooglePlacesAutocomplete
              ref={searchRef as any}
              placeholder={'Search'}
              textInputProps={{
                leftIcon: { type: 'font-awesome', name: 'chevron-left' },
                returnKeyType: 'done',
                onSubmitEditing: onSubmitEditing,
              }}
              styles={{
                listView: {
                  height: MetricsSizes.deviceHeight / 2,
                },
              }}
              onPress={onPress}
              fetchDetails
              // predefinedPlacesAlwaysVisible
              // predefinedPlaces={[homePlace, workPlace]}
              GooglePlacesDetailsQuery={{ fields: 'geometry' }}
              query={{
                key: Config.GOOGLE_MAPS_API_KEY,
                language: 'vn',
                components: 'country:vn',
              }}
            />
          </Container>
        ) : (
          <Container />
        )}
        <Animated
          pitchEnabled={enableDrag}
          rotateEnabled={enableDrag}
          zoomEnabled={enableDrag}
          scrollEnabled={enableDrag}
          ref={mapRef}
          renderToHardwareTextureAndroid
          onRegionChangeComplete={onRegionChangeComplete}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          userLocationPriority={'high'}
          followsUserLocation={true}
          showsMyLocationButton={true}
          style={{ ...StyleSheet.absoluteFillObject }}
          initialRegion={{
            latitude: geolocation.location?.coords.latitude ?? 0,
            longitude: geolocation.location?.coords?.longitude ?? 0,
            longitudeDelta: lngDelta,
            latitudeDelta: latDelta,
          }}
        >
          <Marker
            coordinate={{
              latitude: geolocation.location?.coords.latitude ?? 0,
              longitude: geolocation.location?.coords?.longitude ?? 0,
            }}
          >
            <Image
              source={Images.location}
              w={MetricsSizes.regular}
              h={MetricsSizes.regular}
              resizeMode="contain"
            />
          </Marker>

          <Marker pinColor={Colors.blue} coordinate={origin}>
            <Callout>
              <Text>{origin.address}</Text>
            </Callout>
          </Marker>
          {waypoints?.map(waypoint => {
            return (
              <Marker pinColor={Colors.bgOrange} coordinate={waypoint}>
                <Callout>
                  <Text>{waypoint.address}</Text>
                </Callout>
              </Marker>
            )
          })}
          {/**
           * TODO: hiển thị tài xế nếu có tài xế
           */}
          {animatedFollowingMarker?.map((marker, i) => {
            return marker ? (
              <Marker.Animated
                key={i}
                ref={animatedMarker}
                coordinate={marker as any}
              >
                {/* <Callout>
                  <Text>{marker.licensePlatese}</Text>
                </Callout> */}
                <AnimatedRing />
              </Marker.Animated>
            ) : (
              <></>
            )
          })}
          <Marker pinColor={Colors.green1} coordinate={destination}>
            <Callout>
              <Text>{destination.address ?? ''}</Text>
            </Callout>
          </Marker>
          {originLocation ? (
            <MapViewDirections
              origin={origin}
              destination={destination}
              mode="DRIVING"
              apikey={Config.GOOGLE_MAPS_API_KEY}
              strokeWidth={3}
              lineJoin="miter"
              strokeColor={Colors.primary}
              waypoints={[
                origin,
                ...(waypoints ?? [geolocation.location?.coords!]),
                destination,
              ]}
              optimizeWaypoints={true}
              onReady={onReady}
              precision="high"
              timePrecision="now"
            />
          ) : (
            <></>
          )}
        </Animated>
        {!followingMarkers && (
          <CenterMarker
            valueTextSearch={valueTextSearch}
            focusSearch={focusSearch}
          />
        )}
      </Container>
    )
  },
)
