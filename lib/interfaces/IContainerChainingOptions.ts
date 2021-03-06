export interface IContainerChainingOptions {

    asPrototype(): this;

    asSingleton(): this;

    asConstant(): this;

    asFactory(factoryFnName?: string): this;

    asFactoryResult(factoryKey: string): this;

    withContext(context: {}): this;

    withMethodContext(context: {}): this;
}
