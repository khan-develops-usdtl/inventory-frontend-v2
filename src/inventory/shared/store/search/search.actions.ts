import { createAction, props } from "@ngrx/store";

export const getSearch = createAction('[Search Component] Get Search')
export const setSearch = createAction('[Search Component] Set Search', props<{ text: string }>())
export const clearSearch = createAction('[Search Component] Clear Search')