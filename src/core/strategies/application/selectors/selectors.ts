import {createSelector} from "@reduxjs/toolkit";
import {StrategiesState} from "../../infrastructure/slices/strategies-slice";

export const selectAllStrategiesByUser = createSelector(
    (state: StrategiesState) => state.strategies,
    strategies => strategies
)