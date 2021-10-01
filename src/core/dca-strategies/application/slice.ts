import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {DcaStrategy} from "../models/entities/dca-strategy";
import {retrieveDcaStrategyList} from "./use-cases";

export const dcaStrategiesAdapter = createEntityAdapter<DcaStrategy>();

export const dcaStrategiesInitialState = dcaStrategiesAdapter.getInitialState();

export const dcaStrategiesSlice = createSlice({
    name: 'dcaStrategies',
    initialState: dcaStrategiesInitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(retrieveDcaStrategyList.fulfilled, (state, action) => {
            dcaStrategiesAdapter.setAll(state, action.payload.dcaStrategies);
        })
    },
});