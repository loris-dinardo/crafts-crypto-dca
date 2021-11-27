import {StrategyDto} from "./strategy-dto";

interface StrategyDtoBuilderProps {
    userId?: string;
    uuid?: string;
    name?: string;
}

export const StrategyDtoBuilder = (props: StrategyDtoBuilderProps = {}) => {
    return {
        build(modifiedProps: StrategyDtoBuilderProps = {}): StrategyDto {
            return {
                userId: modifiedProps.userId ?? props.userId ?? "",
                uuid: modifiedProps.uuid ?? props.uuid ?? "",
                name: modifiedProps.name ?? props.name ?? "",
            }
        }
    }
}