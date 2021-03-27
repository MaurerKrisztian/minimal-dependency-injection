import {IResolver} from "../../interfaces/IResolver";
import {IParam} from "../../decorators/Inject";

export class ArgResolver {

    constructor(private readonly resolver: IResolver) {
    }

    async resolveArguments(meta: any, context: any, decoratorKey: symbol | string) {
        let args: IParam[] = meta[decoratorKey];
        if (!args) return [];
        if (context) {
            args = this.mapContextToArgs(args, context);
        }

        const resolvedArgs = [];
        for (let i = 0; i < args.length; i++) {
            if (!this.resolver.hasKeyInDefinition(args[i].key) && !args[i].isRequired) {
                resolvedArgs.push(undefined);
            } else {
                resolvedArgs.push(await this.resolver.resolve(args[i].key, args[i].isRequired))
            }
        }
        return resolvedArgs;
    }

    mapContextToArgs(args: IParam[], ctx: any) {
        const newArgs = args.map((arg: IParam) => {
            if (ctx[arg.key]) {
                return {key: ctx[arg.key], isRequired: arg.isRequired, index: arg.index}
            }
            return arg;
        });
        return newArgs;
    }
}
