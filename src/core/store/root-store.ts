import {Action, AnyAction, configureStore, Dispatch, Middleware, ThunkAction} from "@reduxjs/toolkit";
import {RootUseCasesDependencies} from "./root-use-cases-dependencies";
import {rootReducer, RootState} from "./root-reducer";
import {RootSelectorsDependencies} from "./root-selectors-dependencies";
import {combineDcaStrategiesSelectors} from "../dca-strategies/application/selectors";
import {dcaStrategiesName} from "../dca-strategies/infra/slices/slice";

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
            dcaStrategies: (state: RootState) => combineDcaStrategiesSelectors(state[dcaStrategiesName])
        }
    };
};

export type AppThunk = ThunkAction<void,
    RootState,
    RootUseCasesDependencies,
    Action<string>>;