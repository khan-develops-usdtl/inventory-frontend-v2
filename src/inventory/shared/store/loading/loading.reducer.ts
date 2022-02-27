import { createReducer, on } from "@ngrx/store"
import { getLoading, setLoading } from "./loading.actions"

export const initialState = false

export const loadingReducer = createReducer(
  initialState,
  on(getLoading, state => state),
  on(setLoading, (state, { loading }) => state = loading)
)