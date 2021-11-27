import {Strategy} from "./strategy";

interface StrategyBuilderProps {
    userId?: string;
    uuid?: string;
    name?: string;
}

export const StrategyBuilder = (props: StrategyBuilderProps = {}) => {
    return {
        build(modifiedProps: StrategyBuilderProps = {}): Strategy {
            return {
                userId: modifiedProps.userId ?? props.userId ?? "",
                uuid: modifiedProps.uuid ?? props.uuid ?? "",
                name: modifiedProps.name ?? props.name ?? "",
            }
        }
    }
}