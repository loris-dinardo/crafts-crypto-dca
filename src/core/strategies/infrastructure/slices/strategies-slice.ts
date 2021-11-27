import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {StrategySummary} from "../../models/value-objects/strategy-summary";

export interface StrategiesState {
    strategies?: Array<StrategySummary>;
}

export const strategiesInitialState: StrategiesState = {};

export const strategiesSlice = createSlice({
    name: 'strategies',
    initialState: strategiesInitialState,
    reducers: {
        strategiesRetrieved(state, action: PayloadAction<Array<StrategySummary>>) {
            state.strategies = action.payload;
        }
    }
});

export const {
    name: strategiesName,
    reducer: strategiesReducer,
    actions: strategiesActions
} = strategiesSlice;