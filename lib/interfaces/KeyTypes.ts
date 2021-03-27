import {Keys} from "../Keys";

export interface metaKey {
    [Keys.INJECT_PROPERTY_DECORATOR_KEY]?: symbol[];
}

export interface factoryMethodKey {
    [Keys.FACTORY_METHOD_PROPERTY_DECORATOR_KEY]?: string;
}
