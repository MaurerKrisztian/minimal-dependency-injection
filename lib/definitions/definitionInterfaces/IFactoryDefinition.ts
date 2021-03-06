import { IBaseDefinition } from "./IBaseDefinition";

export interface IFactoryDefinition extends IBaseDefinition {
    context?: {};
    factoryFn: string;
}
