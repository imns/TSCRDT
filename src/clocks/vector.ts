import { Clock } from "../types";

export class VectorClock implements Clock {
    #timestamps: Map<string, number>;

    constructor(nodes: string[]) {
        this.#timestamps = new Map(nodes.map((node) => [node, 0]));
    }

    // Increments the local clock counter
    tick(siteID: string) {
        let current = this.#timestamps.get(siteID) || 0;
        this.#timestamps.set(siteID, current + 1);
    }

    // Getter for the current clock state
    get value() {
        return new Map(this.#timestamps);
    }

    isLT(other: VectorClock): boolean {
        let isLess = false;
        this.#timestamps.forEach((value, key) => {
            if (value < (other.value.get(key) || 0)) {
                isLess = true;
            } else if (value > (other.value.get(key) || 0)) {
                isLess = false;
            }
        });
        return isLess;
    }

    // Merges this clock with another, choosing the maximum value for each site
    merge(other: VectorClock) {
        other.value.forEach((counter, siteID) => {
            let current = this.#timestamps.get(siteID) || 0;
            this.#timestamps.set(siteID, Math.max(current, counter));
        });
    }
}
