import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Strategy} from "../../models/entities";

export interface StrategiesState {
    strategies?: Array<Strategy>;
}

export const strategiesInitialState: StrategiesState = {
};

export const strategiesSlice = createSlice({
    name: 'strategies',
    initialState: strategiesInitialState,
    reducers: {
        strategiesRetrieved(state, action: PayloadAction<Array<Strategy>>) {
            state.strategies = action.payload;
        }
    }
});

export const {
    name: strategiesName,
    reducer: strategiesReducer,
    actions: strategiesActions
} = strategiesSlice;