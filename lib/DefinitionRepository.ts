import {IInstantiatable} from "./interfaces/IInstantiatable";

export class DefinitionRepository {
    definitions = new Map<string, IInstantiatable>();

    getDefinitions() {
        return this.definitions;
    }

    getDefinition(key: string): IInstantiatable {
        if (!this.definitions.has(key)) {
            throw new Error(`${key} instance is undefined`)
        }
        return this.definitions.get(key) as IInstantiatable;
    }

    getDefinitionKeysBySpecificTags(tagObj: any): string[] {
        let resultKeys: string[] = [];
        const tags = Object.keys(tagObj);


        this.definitions.forEach((value: IInstantiatable, key: string) => {
            let found = true;
            tags.forEach((tag) => {
                if (!(value.tags.hasOwnProperty(tag) && value.tags[tag] == tagObj[tag])) {
                    found = false;
                }
            });

            if (found) {
                resultKeys.push(key);
            }
        });

        return resultKeys;
    }

    getDefinitionKeysByTags(tags: string[]): string[] {
        let resultKeys: string[] = [];
        this.definitions.forEach((value: IInstantiatable, key: string) => {
            tags.forEach((tag) => {
                if (value.tags.hasOwnProperty(tag)) {
                    resultKeys.push(key);
                }
            })
        });
        return resultKeys;
    }

    addTags(key: string, tagsObj: object) {
        const definition = this.getDefinition(key);
        const newTags = {...definition.tags, ...tagsObj}
        definition.tags = newTags;
    }

}