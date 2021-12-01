import {combineReducers} from "@reduxjs/toolkit";
import {
    strategiesInitialState,
    strategiesName,
    strategiesReducer
} from "../strategies/infrastructure/slices/strategies-slice";

export const rootReducer = combineReducers({
    [strategiesName]: strategiesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const defaultRootState = (): RootState => {
    return {
        [strategiesName]: strategiesInitialState
    }
}