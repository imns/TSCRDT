import { Clock } from "../types";

export class HybridLogicalClock implements Clock {
    #logicalCounter: number;
    #lastPhysicalTime: number;
    readonly #siteID: string;

    constructor(siteID: string, initialCounter: number = 0) {
        this.#siteID = siteID;
        this.#logicalCounter = initialCounter;
        this.#lastPhysicalTime = Date.now();
    }

    // Increments the HLC
    tick() {
        const currentPhysicalTime = Date.now();
        if (currentPhysicalTime > this.#lastPhysicalTime) {
            this.#lastPhysicalTime = currentPhysicalTime;
            this.#logicalCounter = 0;
        } else {
            this.#logicalCounter++;
        }
    }

    // Getter for the current clock state
    get value() {
        return {
            physicalTime: this.#lastPhysicalTime,
            logicalCounter: this.#logicalCounter,
            siteID: this.#siteID,
        };
    }

    isLT(other: HybridLogicalClock): boolean {
        if (this.#lastPhysicalTime < other.value.physicalTime) {
            return true;
        } else if (this.#lastPhysicalTime === other.value.physicalTime) {
            return this.#logicalCounter < other.value.logicalCounter;
        }
        return false;
    }

    // Merges this clock with another HLC
    merge(other: HybridLogicalClock) {
        if (other.value.physicalTime > this.#lastPhysicalTime) {
            this.#lastPhysicalTime = other.value.physicalTime;
            this.#logicalCounter = other.value.logicalCounter;
        } else if (other.value.physicalTime === this.#lastPhysicalTime) {
            this.#logicalCounter =
                Math.max(this.#logicalCounter, other.value.logicalCounter) + 1;
        }
        // No action needed if other's physical time is less than this clock's physical time
    }
}
