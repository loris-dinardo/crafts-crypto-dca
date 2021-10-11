import {RetrieveDcaStrategyListQuery} from "../../models/ports/retrieve-dca-strategy-list-query";
import {createInMemoryRetrieveDcaStrategyListQuery} from "../adapters";

export type DcaStrategiesDependencies = {
    retrieveDcaStrategyListQuery: RetrieveDcaStrategyListQuery,
}

const createOptionalParamType = (): {
    retrieveDcaStrategyListQuery?: RetrieveDcaStrategyListQuery,
} => {
    return {}
}

export type OptionalParamType = ReturnType<typeof createOptionalParamType>

export const defaultDcaStrategiesDependencies = (opts?: OptionalParamType): DcaStrategiesDependencies => {
    return {
        retrieveDcaStrategyListQuery: opts?.retrieveDcaStrategyListQuery || createInMemoryRetrieveDcaStrategyListQuery(),
    }
}