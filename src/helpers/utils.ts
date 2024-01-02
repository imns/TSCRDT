import { v4 as uuidv4 } from "uuid";

export function createID() {
    return uuidv4();
}

// const originalValue = new Map([['a', 1]]);
// const str = JSON.stringify(originalValue, replacer);
// const newValue = JSON.parse(str, reviver);
export function mapReplacer(_: any, value: any) {
    if (value instanceof Map) {
        return {
            dataType: "Map",
            value: Array.from(value.entries()), // or with spread: value: [...value]
        };
    } else {
        return value;
    }
}

export function mapReviver(_: any, value: any) {
    if (typeof value === "object" && value !== null) {
        if (value.dataType === "Map") {
            return new Map(value.value);
        }
    }
    return value;
}
