import {StrategySummary} from "../../models/value-objects/strategy-summary";

interface StrategySummaryBuilderProps {
    uuid?: string;
    name?: string;
    description?: string;
    asset?: string;
    exchange?: string;
    lastUpdate?: string;
}

export const StrategySummaryBuilder = (props: StrategySummaryBuilderProps = {}) => {
    return {
        build(modifiedProps: StrategySummaryBuilderProps = {}): StrategySummary {
            return {
                uuid: modifiedProps.uuid ?? props.uuid ?? "",
                name: modifiedProps.name ?? props.name ?? "",
                description: modifiedProps.description ?? props.description ?? "",
                asset: modifiedProps.asset ?? props.asset ?? "",
                exchange: modifiedProps.exchange ?? props.exchange ?? "",
                lastUpdate: modifiedProps.lastUpdate ?? props.lastUpdate ?? "",
            }
        }
    }
}