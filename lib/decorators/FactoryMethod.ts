import {factoryMethodKey} from "../interfaces/KeyTypes";
import {Keys} from "../Keys";

export function FactoryMethod() {
    return (
        target: Object,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) => {
        const metadata: factoryMethodKey = Reflect.getMetadata(Keys.FACTORY_METHOD_PROPERTY_DECORATOR_KEY, target.constructor) || {};
        // @ts-ignore
        metadata[Keys.FACTORY_METHOD_PROPERTY_DECORATOR_KEY] = propertyKey;
        Reflect.defineMetadata(Keys.FACTORY_METHOD_PROPERTY_DECORATOR_KEY, metadata, target.constructor);
    };
}
