import {AppThunk} from "../../../store";
import {dcaStrategiesActions} from "../../infra/slices/slice";

export const retrieveDcaStrategyList = (): AppThunk =>
    async (dispatch, _, {dcaStrategies}) => {
        dispatch(dcaStrategiesActions.dcaStrategiesRetrieved(await dcaStrategies.retrieveDcaStrategyListQuery()));
    };