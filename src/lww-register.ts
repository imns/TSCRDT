import type { Mergable, SiteID } from "./types";
import { LamportClock } from "./clocks";

export class LWWRegister<T> implements Mergable {
    #clock: LamportClock;
    #siteID: SiteID;
    state: T;

    get value() {
        return this.state;
    }

    constructor(siteID: SiteID, value: T, initialValue: number = 0) {
        this.#siteID = siteID;
        this.#clock = new LamportClock(siteID, initialValue);
        this.state = value;
    }

    set(value: T) {
        this.state = value;
        this.#clock.tick(); // Increment Lamport clock
    }

    merge(other: LWWRegister<T>): void {
        if (this.#clock.isLT(other.#clock)) {
            this.state = other.state;
            this.#clock.merge(other.#clock); // Update the clock only if the state changes
        }
    }

    toMerged(other: LWWRegister<T>): LWWRegister<T> {
        const copy = new LWWRegister<T>(
            this.#siteID,
            this.state,
            this.#clock.value.counter
        );
        copy.merge(other);
        return copy;
    }
}
