export interface IResolver {
    resolve<T>(key: string, isRequired?:boolean): Promise<T>;
    resolveByType<T>(constructor: any): Promise<T>;
    hasKeyInDefinition(key: string): boolean;
}
