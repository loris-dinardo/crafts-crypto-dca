import {
    DcaStrategiesUseCasesDependencies,
    defaultDcaStrategiesUseCasesDependencies
} from "../dca-strategies/infra/config";
import {
    defaultStrategiesUseCasesDependencies,
    StrategiesUseCasesDependencies
} from "../strategies/infrastructure/configuration/use-cases-dependencies";

export type RootUseCasesDependencies = {
    dcaStrategies: DcaStrategiesUseCasesDependencies,
    strategies: StrategiesUseCasesDependencies,
}

type OptionalUseCasesParamType = {
    dcaStrategies?: DcaStrategiesUseCasesDependencies,
    strategies?: StrategiesUseCasesDependencies,
}

export const defaultRootUseCasesDependencies = ({
                                                    dcaStrategies,
                                                    strategies
                                                }: OptionalUseCasesParamType): RootUseCasesDependencies => {
    return {
        dcaStrategies: defaultDcaStrategiesUseCasesDependencies(dcaStrategies),
        strategies: defaultStrategiesUseCasesDependencies(strategies),
    }
}