export class Utils {

    static isClass = (fn: any) => /^\s*class/.test(fn?.toString());
}