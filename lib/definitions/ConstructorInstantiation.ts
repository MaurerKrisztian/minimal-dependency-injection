import {Keys} from "../Keys";
import {IConstructorDefinition} from "./definitionInterfaces/IConstructorDefinition";
import {IInstantiatable} from "../interfaces/IInstantiatable";
import {IResolver} from "../interfaces/IResolver";
import {ArgResolver} from "./helpers/ArgResolver";

export class ConstructorInstantiation implements IInstantiatable {
    tags = {};

    definition: IConstructorDefinition;
    argResolver: ArgResolver;

    constructor(definition: IConstructorDefinition, private readonly resolver: IResolver) {
        this.definition = definition;
        this.argResolver = new ArgResolver(resolver);
    }

    async instantiate() {
        return await this.resolveConstructor(this.definition.content, this.definition.context, Keys.INJECT_PROPERTY_DECORATOR_KEY);
    }

    private async resolveConstructor(ctr: any, context: any, decoratorKey: symbol) {
        const meta = Reflect.getMetadata(decoratorKey, ctr) || {};
        const args: any = await this.argResolver.resolveArguments(meta, context, Keys.INJECT_PROPERTY_DECORATOR_KEY);
        let resolvedInstance = new ctr(...args);

        return resolvedInstance;
    }

}
