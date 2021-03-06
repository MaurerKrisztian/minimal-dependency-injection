export interface IContainer {
    register<T>(name: string, ctr: new (...args: any) => T): any;

    register<T>(name: string, constant: T): T;

    resolve<T>(name: string): Promise<T>;
}
