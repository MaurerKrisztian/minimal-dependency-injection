import {IFactoryDefinition} from "../definitions/definitionInterfaces/IFactoryDefinition";
import {IConstantDefinition} from "../definitions/definitionInterfaces/IConstantDefinition";
import {IConstructorDefinition} from "../definitions/definitionInterfaces/IConstructorDefinition";
import {IFactoryResultDefinition} from "../definitions/definitionInterfaces/IFactoryResultDefinition";
import {IBaseDefinition} from "../definitions/definitionInterfaces/IBaseDefinition";

export type instantiationMode = 'prototype' | 'singleton'
// export type definitionType = IConstantDefinition | IConstructorDefinition | IFactoryDefinition | IFactoryResultDefinition;
export interface IInstantiatable {
    definition: IBaseDefinition
    tags: any;
    instantiate(): Promise<any>;
}
