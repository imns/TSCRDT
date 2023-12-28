import { describe, expect, test } from "vitest";
import { PNCounter, usePNCounter } from "../src/pncounter";

describe("PNCounter Class", () => {
    test("Initialize", () => {
        let pnCounter = new PNCounter({ value: 0 });
        expect(pnCounter.value).toBe(0);
    });

    test("increment and decrement", () => {
        var a = new PNCounter({ value: 0 });
        var b = new PNCounter({ value: 10 });
        b.merge(a);
        expect(b.value).toBe(10);

        a.increment();
        b.incrementBy(1);
        b.decrement();

        a.merge(b);
        b.merge(a);
        expect(a.value).toBe(11); // 10 + 1 - 1
        expect(b.value).toBe(11);
    });

    test("incrementBy/decrementBy with negative value", () => {
        var a = new PNCounter({ value: 0 });
        expect(() => a.incrementBy(-7)).toThrowError();
        expect(() => a.decrementBy(-7)).toThrowError();
    });

    test("3 Laws", () => {
        var a = new PNCounter({ value: 0 });
        var b = new PNCounter({ value: 10 });
        var c = new PNCounter({ value: -5 });

        a.increment();
        b.incrementBy(2);
        c.decrementBy(3);

        expect(a.toMerged(b).value).toBe(b.toMerged(a).value);
        expect(a.toMerged(a).value).toBe(a.value);
        expect(a.toMerged(b).toMerged(c).value).toBe(
            a.toMerged(b.toMerged(c)).value
        );
    });
});

describe("useGCounter", () => {
    test("Initialize", () => {
        let gcounter = usePNCounter(0);
        expect(gcounter.value).toBe(0);
    });
});
