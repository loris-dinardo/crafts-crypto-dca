import {RetrieveStrategiesCommand} from "./commands/retrieve-strategies-command";
import {AppThunk} from "../../../store";
import {strategiesActions} from "../../infrastructure/slices/strategies-slice";
import {RetrieveStrategiesByUserPresenter} from "./presenters/retrieve-strategies-by-user-presenter";

export const retrieveStrategies = (command: RetrieveStrategiesCommand, presenter?: RetrieveStrategiesByUserPresenter): AppThunk =>
    async (dispatch, _, {strategies}) => {
        try {
            presenter && presenter.retrievingStrategies && presenter.retrievingStrategies();
            const {retrieveStrategiesByUserQuery} = strategies;
            const strategiesByUser = await retrieveStrategiesByUserQuery(command.userId);
            dispatch(strategiesActions.strategiesRetrieved(strategiesByUser));
        } catch (e) {
            presenter && presenter.retrievingStrategiesFailed && presenter.retrievingStrategiesFailed(e);
        } finally {
            presenter && presenter.strategiesRetrieved && presenter.strategiesRetrieved();
        }
    };