import type { Mergable, SiteID } from "./types";
import { LWWRegister } from "./lww-register";
import { createID, mapReplacer, mapReviver } from "./helpers/utils";

type Value<T> = {
    [key: string]: T;
};

export class LWWMap<T> implements Mergable {
    #siteID: SiteID;
    #state = new Map<string, LWWRegister<T>>();

    constructor(siteID: SiteID, initialState: Value<T> = {}) {
        this.#siteID = siteID ?? createID();

        for (const [key, value] of Object.entries(initialState)) {
            this.#state.set(key, new LWWRegister<T>(this.#siteID, value));
        }
    }

    get value(): Value<T> {
        const value: Value<T> = {};
        for (const [key, register] of this.#state.entries()) {
            value[key] = register.value;
        }
        return value;
    }

    // has(key: string): boolean {
    //     return this.#state.has(key);
    // }

    get(key: string): T | null {
        return this.#state.get(key)?.value ?? null;
    }

    set(key: string, value: T): void {
        const register = this.#state.get(key);
        if (register) {
            register.set(value);
        } else {
            this.#state.set(key, new LWWRegister<T>(this.#siteID, value));
        }
    }

    // delete(key: string): void {
    //     this.set(key, null);
    // }

    merge(other: LWWMap<T>): void {
        for (const [key, otherRegister] of other.#state) {
            const localRegister = this.#state.get(key);
            if (localRegister) {
                localRegister.merge(otherRegister);
            } else {
                this.#state.set(key, otherRegister);
            }
        }
    }

    toMerged(other: LWWMap<T>): LWWMap<T> {
        const copy = new LWWMap<T>(this.#siteID);
        for (const [key, register] of this.#state) {
            copy.#state.set(
                key,
                new LWWRegister<T>(this.#siteID, register.value)
            );
        }
        copy.merge(other);
        return copy;
    }

    toJSON(): string {
        return JSON.stringify(this.#state, mapReplacer);
    }

    fromJSON(json: string): void {
        this.#state = JSON.parse(json, mapReviver);
    }
}
