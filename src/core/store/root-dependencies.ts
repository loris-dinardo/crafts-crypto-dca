import {DcaStrategiesDependencies, defaultDcaStrategiesDependencies} from "../dca-strategies/infra/config";

export type RootDependencies = {
    dcaStrategies: DcaStrategiesDependencies
}

const createOptionalParamType = (): {
    dcaStrategies?: DcaStrategiesDependencies,
} => {
    return {}
}

type OptionalParamType = ReturnType<typeof createOptionalParamType>

export const defaultRootDependencies = ({dcaStrategies}: OptionalParamType): RootDependencies => {
    return {
        dcaStrategies: defaultDcaStrategiesDependencies(dcaStrategies),
    }
}