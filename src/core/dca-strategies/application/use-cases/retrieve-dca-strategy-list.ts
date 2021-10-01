import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    RetrieveDcaStrategyListQuery,
    RetrieveDcaStrategyListQueryResult
} from "../../models/ports/retrieve-dca-strategy-list-query";

export const retrieveDcaStrategyList = createAsyncThunk<RetrieveDcaStrategyListQueryResult, void,
    { extra: { retrieveDcaStrategyListQuery: RetrieveDcaStrategyListQuery } }>
("dcaStrategies/retrieveDcaStrategyList", async (_, {extra: {retrieveDcaStrategyListQuery}}) => {
    return retrieveDcaStrategyListQuery();
});