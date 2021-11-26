import {RetrieveDcaStrategyListQuery} from "../../models/ports/retrieve-dca-strategy-list-query";
import {createInMemoryRetrieveDcaStrategyListQuery} from "../adapters";

export type DcaStrategiesUseCasesDependencies = {
    retrieveDcaStrategyListQuery: RetrieveDcaStrategyListQuery,
}

export type OptionalUseCasesParamType = {
    retrieveDcaStrategyListQuery?: RetrieveDcaStrategyListQuery,
}

export const defaultDcaStrategiesUseCasesDependencies = (opts?: OptionalUseCasesParamType): DcaStrategiesUseCasesDependencies => {
    return {
        retrieveDcaStrategyListQuery: opts?.retrieveDcaStrategyListQuery || createInMemoryRetrieveDcaStrategyListQuery(),
    }
}