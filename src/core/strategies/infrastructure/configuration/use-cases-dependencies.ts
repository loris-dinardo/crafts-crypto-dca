import {RetrieveStrategiesByUserQuery} from "../../models/ports/retrieve-strategies-by-user-query";
import {createInMemoryRetrieveStrategiesByUserQuery} from "../adapters/in-memory-retrieve-strategies-by-user-query";

export type StrategiesUseCasesDependencies = {
    retrieveStrategiesByUserQuery: RetrieveStrategiesByUserQuery,
}

export type OptionalUseCasesParamType = {
    retrieveStrategiesByUserQuery?: RetrieveStrategiesByUserQuery,
}

export const defaultStrategiesUseCasesDependencies = (opts?: OptionalUseCasesParamType): StrategiesUseCasesDependencies => {
    return {
        retrieveStrategiesByUserQuery: opts?.retrieveStrategiesByUserQuery || createInMemoryRetrieveStrategiesByUserQuery(),
    }
}