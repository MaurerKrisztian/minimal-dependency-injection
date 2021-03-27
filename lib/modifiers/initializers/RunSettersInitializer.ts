import {IInitializer} from "./IInitializer";
import {Keys} from "../../Keys";
import {ArgResolver} from "../../definitions/helpers/ArgResolver";
import {IResolver} from "../../interfaces/IResolver";

export class RunSettersInitializer implements IInitializer {
    argResolver: ArgResolver = new ArgResolver(this.resolver);

    constructor(private readonly resolver: IResolver) {
    }

    async run(resolvedInstance: any, definition: any): Promise<any> {
        return await this.runSetters(resolvedInstance, definition)
    }


    async runSetters(resolvedInstance: any, definition: any): Promise<any> {
        const initMethodMeta = Reflect.getMetadata(Keys.SETTER_METHOD_PROPERTY_DECORATOR_KEY, definition.content) || {};
        const setterMethods: string[] = initMethodMeta[Keys.SETTER_METHOD_PROPERTY_DECORATOR_KEY];
        if (setterMethods == undefined || setterMethods.length <= 0) return resolvedInstance;
        for (let i = 0; i < setterMethods.length; i++) {
            if (setterMethods[i] != undefined) {
                const setterParamsMeta = Reflect.getMetadata(setterMethods[i], definition.content) || {};
                const setterFnArgs: any = await this.argResolver.resolveArguments(setterParamsMeta, definition.context, setterMethods[i]) || [];
                if (setterFnArgs.length > 1) {
                    throw new Error('@Setter method too many args (pleas pass 1 @inject(\'key\') arg) to ' + setterMethods[i]);
                }
                try {
                    resolvedInstance[setterMethods[i]] = setterFnArgs[0];
                } catch (err) {
                    console.error(err);
                    throw new Error('@Setter method only allowed to setters (example: @Setter() set setVariable(@Inject(\'key\') param){...})')
                }
            }
        }
        return resolvedInstance;
    }
}
