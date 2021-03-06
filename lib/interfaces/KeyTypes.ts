import { Keys } from "../Keys";

export interface MetaKey {
    [Keys.INJECT_PROPERTY_DECORATOR_KEY]?: symbol[];
}

export interface FactoryMethodKey {
    [Keys.FACTORY_METHOD_PROPERTY_DECORATOR_KEY]?: string;
}
