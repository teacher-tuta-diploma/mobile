import React, { useEffect, useMemo, useState } from 'react'
import Geolocation from 'react-native-geolocation-service'
import RNAndroidLocationEnabler from 'react-native-android-location-enabler'
import { PermissionsAndroid, Platform } from 'react-native'

export type GeolocationT = {
  location?: Geolocation.GeoPosition
}

export const GeolocationContext = React.createContext<Partial<GeolocationT>>({})

const GeolocationProvider = ({ children }: { children: React.ReactNode }) => {
  const [location, setLocation] = useState<Geolocation.GeoPosition>()

  useEffect(() => {
    if (Platform.OS === 'android') {
      ;(async () => {
        // The user has accepted to enable the location services
        // data can be :
        //  - "already-enabled" if the location services has been already enabled
        //  - "enabled" if user has clicked on OK button in the popup
        const result =
          await RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
            interval: 10000,
            fastInterval: 5000,
          })
        if (result === 'already-enabled') {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Example App',
              message: 'Example App access to your location ',
              buttonPositive: 'OK',
            },
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the location')
            Geolocation.getCurrentPosition(
              position => {
                console.log(
                  '🛠 LOG: 🚀 --> ------------------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
                )
                console.log(
                  '🛠 LOG: 🚀 --> ~ file: index.tsx ~ line 115 ~ useEffect ~ initialPosition',
                  position,
                )
                console.log(
                  '🛠 LOG: 🚀 --> ------------------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
                )
                setLocation(position)
              },
              error => console.log('Error', JSON.stringify(error)),
              {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000,
              },
            )
            Geolocation.watchPosition(position => {
              const lastPosition = JSON.stringify(position)
              console.log(
                '🛠 LOG: 🚀 --> ------------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
              )
              console.log(
                '🛠 LOG: 🚀 --> ~ file: index.tsx ~ line 121 ~ useEffect ~ lastPosition',
                lastPosition,
              )
              console.log(
                '🛠 LOG: 🚀 --> ------------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
              )
              setLocation(position)
            })
          } else {
            console.log('location permission denied')
          }
        }
      })()
    } else {
      Geolocation.getCurrentPosition(
        position => {
          console.log(
            '🛠 LOG: 🚀 --> ------------------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
          )
          console.log(
            '🛠 LOG: 🚀 --> ~ file: index.tsx ~ line 115 ~ useEffect ~ initialPosition',
            position,
          )
          console.log(
            '🛠 LOG: 🚀 --> ------------------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
          )
          setLocation(position)
        },
        error => console.log('Error', JSON.stringify(error)),
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000,
        },
      )
      Geolocation.watchPosition(position => {
        const lastPosition = JSON.stringify(position)
        console.log(
          '🛠 LOG: 🚀 --> ------------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
        )
        console.log(
          '🛠 LOG: 🚀 --> ~ file: index.tsx ~ line 121 ~ useEffect ~ lastPosition',
          lastPosition,
        )
        console.log(
          '🛠 LOG: 🚀 --> ------------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
        )
        setLocation(position)
      })
    }
  }, [])

  const contextValue = useMemo<GeolocationT>(
    () => ({
      location,
    }),
    [location],
  )
  return (
    <GeolocationContext.Provider value={contextValue}>
      {children}
    </GeolocationContext.Provider>
  )
}

export default GeolocationProvider
