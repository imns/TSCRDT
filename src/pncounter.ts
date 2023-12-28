import type { Mergable, SiteID } from "./types";
import type { GCounterState } from "./gcounter";
import { Max } from "./max";
import { createID } from "./helpers/utils";

interface PNCounterState {
    increments: GCounterState;
    decrements: GCounterState;
}

export class PNCounter implements Mergable {
    #siteID: SiteID;
    #state: PNCounterState;

    constructor({
        siteID,
        value: initialValue,
    }: {
        siteID?: SiteID;
        value: number;
    }) {
        this.#siteID = siteID || createID();
        this.#state = {
            increments: {
                [this.#siteID]: new Max(initialValue >= 0 ? initialValue : 0),
            },
            decrements: {
                [this.#siteID]: new Max(initialValue < 0 ? -initialValue : 0),
            },
        };
    }

    get value() {
        const totalIncrements = Object.values(this.#state.increments).reduce(
            (acc, cur) => acc + cur.value,
            0
        );
        const totalDecrements = Object.values(this.#state.decrements).reduce(
            (acc, cur) => acc + cur.value,
            0
        );
        return totalIncrements - totalDecrements;
    }

    increment() {
        this.incrementBy(1);
    }

    incrementBy(value: number = 1) {
        if (value < 0) {
            throw new Error("Increment value must be non-negative");
        }
        this.#state.increments[this.#siteID].value += value;
    }
    decrement() {
        this.decrementBy(1);
    }

    decrementBy(value: number = 1) {
        if (value < 0) {
            throw new Error("Decrement value must be non-negative");
        }
        this.#state.decrements[this.#siteID].value += value;
    }

    merge(other: PNCounter): void {
        // Merge both increments and decrements
        for (const [siteID, max] of Object.entries(other.#state.increments)) {
            if (this.#state.increments[siteID]) {
                this.#state.increments[siteID].merge(max);
            } else {
                this.#state.increments[siteID] = max;
            }
        }
        for (const [siteID, max] of Object.entries(other.#state.decrements)) {
            if (this.#state.decrements[siteID]) {
                this.#state.decrements[siteID].merge(max);
            } else {
                this.#state.decrements[siteID] = max;
            }
        }
    }

    toMerged(other: PNCounter): PNCounter {
        let copy = new PNCounter({ siteID: this.#siteID, value: 0 });
        copy.#state = { ...this.#state };
        copy.merge(other);
        return copy;
    }
}

export function usePNCounter(...args: [number] | [SiteID, number]) {
    if (args.length === 1) {
        let [value] = args;
        return new PNCounter({ value });
    } else if (args.length === 2) {
        let [siteID, value] = args;
        return new PNCounter({ siteID, value });
    } else {
        throw new Error("Invalid arguments");
    }
}
