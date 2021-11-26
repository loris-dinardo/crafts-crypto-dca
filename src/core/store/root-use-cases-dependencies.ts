import {
    DcaStrategiesUseCasesDependencies,
    defaultDcaStrategiesUseCasesDependencies
} from "../dca-strategies/infra/config";

export type RootUseCasesDependencies = {
    dcaStrategies: DcaStrategiesUseCasesDependencies
}

type OptionalUseCasesParamType = {
    dcaStrategies?: DcaStrategiesUseCasesDependencies
}

export const defaultRootUseCasesDependencies = ({dcaStrategies}: OptionalUseCasesParamType): RootUseCasesDependencies => {
    return {
        dcaStrategies: defaultDcaStrategiesUseCasesDependencies(dcaStrategies),
    }
}