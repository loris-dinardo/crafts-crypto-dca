import {Action, AnyAction, configureStore, Dispatch, Middleware, ThunkAction} from "@reduxjs/toolkit";
import {RootDependencies} from "./root-dependencies";
import {rootReducer, RootState} from "./root-reducer";

export const configureReduxStore = (
    dependencies: RootDependencies,
    preloadedState?: RootState,
    additionalMiddleware?: Middleware<{}, RootState, Dispatch<AnyAction>>
) => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            thunk: {
                extraArgument: dependencies,
            },
        }).concat(additionalMiddleware ? [additionalMiddleware] : []),
        preloadedState,
        //devTools: (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    });
};

export type AppThunk = ThunkAction<void,
    RootState,
    RootDependencies,
    Action<string>>;