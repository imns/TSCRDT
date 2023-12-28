import { Clock, SiteID } from "../types";

export class LamportClock implements Clock {
    #counter: number;
    readonly #siteID: SiteID;

    constructor(siteID: string, initialCounter: number = 0) {
        this.#siteID = siteID;

        if (initialCounter < 0) {
            console.log("Initial counter must be a positive integer");
            initialCounter = 0;
        }

        this.#counter = initialCounter;
    }

    // Increments the clock counter, typically called when an event occurs
    tick() {
        this.#counter++;
    }

    // Getter for the current clock state
    get value() {
        return { counter: this.#counter, siteID: this.#siteID };
    }

    isLT(other: LamportClock): boolean {
        if (this.#counter === other.value.counter) {
            return this.#siteID < other.value.siteID;
        }
        return this.#counter < other.value.counter;
    }

    // Method to adjust the clock based on an external source, e.g., receiving a message
    merge(other: LamportClock) {
        this.#counter = Math.max(this.#counter, other.value.counter);
    }
}
