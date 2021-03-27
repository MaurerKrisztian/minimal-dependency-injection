export interface IResolver {
    resolve<T>(key: string, isRequired?:boolean): Promise<T>;
    hasKeyInDefinition(key: string): boolean;
}
