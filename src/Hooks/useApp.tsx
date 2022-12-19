import { AppDispatch, RootState } from '@/Store'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { TypedUseSelectorHook } from 'react-redux'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
