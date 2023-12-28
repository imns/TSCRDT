import type { Mergable } from "./types";

interface GSetProps<T> {
    value: T[];
}

export class GSet<T> implements Mergable {
    #state: Set<T>;

    constructor({ value = [] }: GSetProps<T>) {
        this.#state = new Set(value);
    }

    get value(): T[] {
        return Array.from(this.#state);
    }

    add(element: T) {
        this.#state.add(element);
    }

    has(element: T) {
        return this.#state.has(element);
    }

    merge(other: GSet<T>): void {
        this.#state = new Set([...this.#state, ...other.value]);
    }

    toMerged(other: this): GSet<T> {
        const copy = new GSet({ value: this.value });
        copy.merge(other);
        return copy;
    }
}
