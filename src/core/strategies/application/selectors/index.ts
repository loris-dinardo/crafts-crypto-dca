import {StrategiesState} from "../../infrastructure/slices/strategies-slice";
import {selectAllStrategiesByUser} from "./selectors";

export const combineStrategiesSelectors = (state: StrategiesState) => {
    return {
        getAllByUser: () => selectAllStrategiesByUser(state)
    }
}