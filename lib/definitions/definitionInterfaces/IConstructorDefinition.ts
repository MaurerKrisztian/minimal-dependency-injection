import {instantiationMode} from "../../interfaces/IInstantiatable";
import {IBaseDefinition} from "./IBaseDefinition";

export interface IConstructorDefinition extends IBaseDefinition{
    context?: {}
}
