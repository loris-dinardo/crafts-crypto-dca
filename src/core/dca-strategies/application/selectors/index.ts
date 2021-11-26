import {DcaStrategiesState} from "../../infra/slices/slice";
import {selectDCAStrategies} from "./selectors";

export const combineDcaStrategiesSelectors = (state: DcaStrategiesState) => {
    return {
        getAll: () => selectDCAStrategies(state)
    }
}