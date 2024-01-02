import type { Mergable, SiteID } from "./types";
import { Max } from "./max";
import { createID } from "./helpers/utils";

export interface GCounterProps {
    siteID?: SiteID;
    value: number;
}

export interface GCounterState {
    [siteID: SiteID]: Max;
}

export class GCounter implements Mergable {
    #siteID: SiteID;
    #state: GCounterState;

    constructor({ siteID, value }: GCounterProps) {
        this.#siteID = siteID ? siteID : createID();
        this.#state = { [this.#siteID]: new Max(value) };
    }

    get value() {
        return Object.values(this.#state).reduce(
            (acc, cur) => acc + cur.value,
            0
        );
    }

    increment() {
        this.#state[this.#siteID].value += 1;
    }

    incrementBy(value: number) {
        if (value < 0) {
            throw new Error("Cannot increment by negative value");
        }
        this.#state[this.#siteID].value += value;
    }

    merge(other: GCounter): void {
        for (const [siteID, max] of Object.entries(other.#state)) {
            if (this.#state[siteID]) {
                this.#state[siteID].merge(max);
            } else {
                this.#state[siteID] = max;
            }
        }
    }

    toMerged(other: GCounter): GCounter {
        let copy = this.clone();
        copy.merge(other);
        return copy;
    }

    clone(): GCounter {
        let copy = new GCounter({ siteID: this.#siteID, value: 0 });
        copy.#state = { ...this.#state };
        return copy;
    }

    serialize() {
        const serializedState: {
            [siteID: SiteID]: number;
        } = {};
        for (const [siteID, max] of Object.entries(this.#state)) {
            serializedState[siteID] = max.value;
        }
        return JSON.stringify({ siteID: this.#siteID, state: serializedState });
    }

    static hydrate(serializedState: string): GCounter {
        const { siteID, state } = JSON.parse(serializedState);
        const reconstructedState: GCounterState = {};

        for (const [key, serializedMax] of Object.entries(state)) {
            console.log(key, serializedMax);
            reconstructedState[key] = new Max(serializedMax as number);
        }

        const counter = new GCounter({ siteID: siteID, value: 0 });
        counter.#state = reconstructedState;

        return counter;
    }
}

// Helper method useGCounter to create a GCounter instance
export function useGCounter(...args: [number] | [SiteID, number]) {
    if (args.length === 1) {
        let [value] = args;
        return new GCounter({ value });
    } else if (args.length === 2) {
        let [siteID, value] = args;
        return new GCounter({ siteID, value });
    } else {
        throw new Error("Invalid arguments");
    }
}
