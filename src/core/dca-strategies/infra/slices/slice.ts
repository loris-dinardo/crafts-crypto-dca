import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {DcaStrategy} from "../../models/entities/dca-strategy";

export interface DcaStrategiesState {
    strategies: Array<DcaStrategy>;
}

export const dcaStrategiesInitialState: DcaStrategiesState = {
    strategies: [],
};

export const dcaStrategiesSlice = createSlice({
    name: 'dcaStrategies',
    initialState: dcaStrategiesInitialState,
    reducers: {
        dcaStrategiesRetrieved(state, action: PayloadAction<Array<DcaStrategy>>) {
            state.strategies = action.payload;
        }
    }
});

export const {
    name: dcaStrategiesName,
    reducer: dcaStrategiesReducer,
    actions: dcaStrategiesActions
} = dcaStrategiesSlice;