import {dcaStrategiesAdapter} from "../slice";
import {RootState} from "../../../store";

const dcaStrategiesSelectors = dcaStrategiesAdapter.getSelectors<RootState>((state) => state.dcaStrategies);

export const selectDCAStrategies = (state: RootState) => {
    const dcaStrategies = dcaStrategiesSelectors.selectAll(state);

    return {
        dcaStrategies
    }
}