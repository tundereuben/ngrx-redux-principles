import { createAction, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import * as UserActions from './user.actions';

export interface UserState {
    maskUsername: boolean;
    user: any;
}

const initialState: UserState = {
    maskUsername: true,
    user: {}
}

const getUserFeatureState = createFeatureSelector<UserState>('user');

export const getMaskUsername = createSelector(
    getUserFeatureState,
    state => state.maskUsername
)

export const userReducer = createReducer(
    initialState,
    on(UserActions.maskUsername, (state): UserState => {
        return {
            ...state,
            maskUsername: !state.maskUsername
        }
    })
)