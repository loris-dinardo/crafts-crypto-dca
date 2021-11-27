import {combineReducers} from "@reduxjs/toolkit";
import {dcaStrategiesInitialState, dcaStrategiesName, dcaStrategiesReducer} from "../dca-strategies/infra/slices/slice";
import {
    strategiesInitialState,
    strategiesName,
    strategiesReducer
} from "../strategies/infrastructure/slices/strategies-slice";

export const rootReducer = combineReducers({
    [dcaStrategiesName]: dcaStrategiesReducer,
    [strategiesName]: strategiesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const defaultRootState = (): RootState => {
    return {
        [dcaStrategiesName]: dcaStrategiesInitialState,
        [strategiesName]: strategiesInitialState
    }
}