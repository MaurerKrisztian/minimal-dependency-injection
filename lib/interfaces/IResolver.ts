import { IContainerOption } from "../Container";

export interface IResolver {
    resolve<T>(key: string, isRequired?: boolean): Promise<T>;

    options: IContainerOption;

    resolveByType<T>(constructor: any): Promise<T>;

    hasKeyInDefinition(key: string): boolean;
}
