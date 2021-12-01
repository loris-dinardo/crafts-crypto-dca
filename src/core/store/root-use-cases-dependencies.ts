import {
    defaultStrategiesUseCasesDependencies,
    StrategiesUseCasesDependencies
} from "../strategies/infrastructure/configuration/use-cases-dependencies";

export type RootUseCasesDependencies = {
    strategies: StrategiesUseCasesDependencies,
}

type OptionalUseCasesParamType = {
    strategies?: StrategiesUseCasesDependencies,
}

export const defaultRootUseCasesDependencies = ({
                                                    strategies
                                                }: OptionalUseCasesParamType): RootUseCasesDependencies => {
    return {
        strategies: defaultStrategiesUseCasesDependencies(strategies),
    }
}