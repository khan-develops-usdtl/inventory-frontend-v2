import { createAction, props } from "@ngrx/store";

export const getLoading = createAction('[Loading Component] GET LOADING')
export const setLoading = createAction('[Loading Component] SET LOADING', props<{ loading: boolean}>())