import { IBaseDefinition } from "../definitions/definitionInterfaces/IBaseDefinition";

export type instantiationMode = "prototype" | "singleton";

// export type definitionType = IConstantDefinition | IConstructorDefinition | IFactoryDefinition | IFactoryResultDefinition;
export interface IInstantiatable {
    definition: IBaseDefinition;
    tags: any;

    instantiate(): Promise<any>;
}
