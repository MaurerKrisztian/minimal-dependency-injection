import {Keys} from "../Keys";

export function RunBefore(key: string) {
    return (
        target: Object,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) => {

        const metadata: any = Reflect.getMetadata(Keys.BEFORE_METHOD_KEY, target.constructor) || {};
        // @ts-ignore
        metadata[propertyKey] = key;
        Reflect.defineMetadata(Keys.BEFORE_METHOD_KEY, metadata, target.constructor);
    };
}
