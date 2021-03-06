import { IBaseDefinition } from "./IBaseDefinition";

export interface IFactoryResultDefinition extends IBaseDefinition {
    factoryMethodContext?: {};
    factoryKey: string;
}
