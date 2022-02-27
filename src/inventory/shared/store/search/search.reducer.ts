import { createReducer, on } from "@ngrx/store"
import { clearSearch, getSearch, setSearch } from "./search.actions"

export const initialState: string = ''

export const searchReducer = createReducer(
  initialState,
  on(getSearch, state => state),
  on(setSearch, (state, { text }) => state = text),
  on(clearSearch, state => state = ''),
)