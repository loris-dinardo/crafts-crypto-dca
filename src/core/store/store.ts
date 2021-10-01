import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {dcaStrategiesSlice} from "../dca-strategies/application/slice";
import {RetrieveDcaStrategyListQuery} from "../dca-strategies/models/ports/retrieve-dca-strategy-list-query";

const rootReducer = combineReducers({
    [dcaStrategiesSlice.name]: dcaStrategiesSlice.reducer
});

export type RootState = ReturnType<typeof rootReducer>;

export type StoreProps = {
    retrieveDcaStrategyListQuery: RetrieveDcaStrategyListQuery;
    preloadedState?: RootState;
    // queries, commands
};

export const createStore = (
    {
        // queries, commands,
        retrieveDcaStrategyListQuery,
        preloadedState
    }: StoreProps) => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: {
                    extraArgument: {
                        // queries, commands
                        retrieveDcaStrategyListQuery
                    },
                },
            }),
        preloadedState,
    });
};

export type AppDispatch = ReturnType<typeof createStore>['dispatch'];