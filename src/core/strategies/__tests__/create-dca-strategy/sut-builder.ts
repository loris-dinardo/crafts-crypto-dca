interface SUTProps {
    exchanges?: Array<string>,
    assets?: Array<string>
}

export const createDcaStrategySUT = (props: SUTProps = {}) => {
    return{
        withExistingExchanges(exchanges: SUTProps['exchanges']) {
            return createDcaStrategySUT({
                ...props,
                exchanges
            });
        },
        withExistingAssets(assets: SUTProps['assets']) {
            return createDcaStrategySUT({
                ...props,
                assets
            });
        },
        build(){
            const selectDcaStrategiesByUser = () => [];
            const createDcaStrategyByUser = async () => undefined;
            return {
                selectDcaStrategiesByUser,
                createDcaStrategyByUser
            }
        }
    }
}