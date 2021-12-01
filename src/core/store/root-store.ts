import {Action, AnyAction, configureStore, Dispatch, Middleware, ThunkAction} from "@reduxjs/toolkit";
import {RootUseCasesDependencies} from "./root-use-cases-dependencies";
import {rootReducer, RootState} from "./root-reducer";
import {RootSelectorsDependencies} from "./root-selectors-dependencies";
import {strategiesName} from "../strategies/infrastructure/slices/strategies-slice";
import {combineStrategiesSelectors} from "../strategies/application/selectors";

export const configureReduxStore = (
    useCasesDependencies: RootUseCasesDependencies,
    selectorsDependencies: RootSelectorsDependencies,
    preloadedState?: RootState,
    additionalMiddleware?: Middleware<{}, RootState, Dispatch<AnyAction>>
) => {
    const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            thunk: {
                extraArgument: useCasesDependencies,
            },
        }).concat(additionalMiddleware ? [additionalMiddleware] : []),
        preloadedState,
        //devTools: (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    });

    return {
        store,
        selectors: {
            strategies: (state: RootState) => combineStrategiesSelectors(state[strategiesName]),
        }
    };
};

export type AppThunk = ThunkAction<void,
    RootState,
    RootUseCasesDependencies,
    Action<string>>;