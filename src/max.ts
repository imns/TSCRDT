import type { Mergable } from "./types";

export class Max implements Mergable {
    public value: number;

    constructor(value: number) {
        this.value = value;
    }

    valueOf(): number {
        return this.value;
    }

    merge(other: this) {
        this.value = Math.max(this.value, other.value);
    }

    toMerged(other: this): Max {
        let copy = new Max(this.value);
        copy.merge(other);
        return copy;
    }
}
