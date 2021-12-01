export * from "./root-store"

import {configureReduxStore} from "./root-store";
import {defaultRootUseCasesDependencies} from "./root-use-cases-dependencies";
import {defaultRootSelectorsDependencies} from "./root-selectors-dependencies";
import {TypedUseSelectorHook, useSelector as useReduxSelector} from "react-redux";
import {RootState} from "./root-reducer";

export const {store, selectors} = configureReduxStore(
    defaultRootUseCasesDependencies({}),
    defaultRootSelectorsDependencies({})
);

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;