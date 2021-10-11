import {combineReducers} from "@reduxjs/toolkit";
import {dcaStrategiesInitialState, dcaStrategiesName, dcaStrategiesReducer} from "../dca-strategies/application/slice";

export const rootReducer = combineReducers({
    [dcaStrategiesName]: dcaStrategiesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const defaultRootState = (): RootState => {
    return {
        [dcaStrategiesName]: dcaStrategiesInitialState,
    }
}