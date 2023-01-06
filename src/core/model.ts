
import "reflect-metadata/Reflect"

export class Model {
    toJSON(): string {
        return JSON.stringify(self);
    }

    Properties(): string[] {
        return Reflect.getMetadata("property", this)
    }
}

export function ModelProperty(target: any, key: string) {
    // Define metadata for target
    var t = Reflect.getMetadata("design:type", target, key);
    console.log(`${key} target: ${target} type: ${t}`);
}
