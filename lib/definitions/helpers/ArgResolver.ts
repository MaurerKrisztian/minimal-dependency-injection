import { IResolver } from "../../interfaces/IResolver";
import { IParam } from "../../decorators/Inject";
import { Keys } from "../../Keys";

export class ArgResolver {

    constructor(private readonly resolver: IResolver) {
    }

    paramIsNotRequired(param: IParam) {
        return !this.resolver.hasKeyInDefinition(param.key) && !param?.isRequired;
    }

    async resolveArguments(meta: any, context: any, decoratorKey: symbol | string) {
        let args: IParam[] = meta[decoratorKey];
        if (!args) return [];
        if (context) {
            args = this.mapContextToArgs(args, context);
        }

        const resolvedArgs = [];
        for (let i = 0; i < args.length; i++) {
            if (!args[i]) {
                resolvedArgs.push(Keys.OTHER_INJECTION_REQUIRED);
            } else if (this.paramIsNotRequired(args[i])) {
                resolvedArgs.push(undefined);
            } else {
                resolvedArgs.push(await this.resolver.resolve(args[i].key, args[i].isRequired));
            }
        }
        return resolvedArgs;
    }

    mapContextToArgs(args: IParam[], ctx: any): IParam[] {
        return args.map((arg: IParam) => {
            if (ctx[arg.key]) {
                return {key: ctx[arg.key], isRequired: arg.isRequired, index: arg.index};
            }
            return arg;
        });
    }
}
