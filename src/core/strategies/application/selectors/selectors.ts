import {createSelector} from "@reduxjs/toolkit";
import {StrategiesState} from "../../infrastructure/slices/strategies-slice";

export const selectAllStrategiesByUser = createSelector(
    (state: StrategiesState) => state.strategies,
    strategies => strategies
)

export const selectStrategyUuids = createSelector(
    (state: StrategiesState) => state.strategies,
    strategies => strategies ? strategies.map((strategy) => strategy.uuid) : []
);

export const selectStrategyByUuid = (uuid: string) => createSelector(
    (state: StrategiesState) => state.strategies?.filter(strategy => strategy.uuid === uuid)[0],
    strategy => strategy
);