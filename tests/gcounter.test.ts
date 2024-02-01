import { describe, expect, test } from "vitest";
import { GCounter, useGCounter } from "../src/gcounter";

describe("GCounter Class", () => {
    test("Initialize", () => {
        let gcounter = new GCounter({ value: 0 });
        expect(gcounter.value).toBe(0);
    });

    test("increment", () => {
        // User A
        var a = new GCounter({ value: 0 });
        // User B
        var b = new GCounter({ value: 10 });

        b.merge(a);
        expect(b.value).toBe(10);

        a.increment();
        b.incrementBy(1);

        a.merge(b);
        b.merge(a);
        expect(a.value).toBe(12);
        expect(b.value).toBe(12);
    });

    test("incrementBy by negative", () => {
        var a = new GCounter({ value: 0 });
        expect(() => a.incrementBy(-7)).toThrowError();
    });

    test("3 Laws", () => {
        var a = new GCounter({ value: 0 });
        var b = new GCounter({ value: 10 });
        var c = new GCounter({ value: 20 });

        a.increment();
        b.incrementBy(2);
        c.incrementBy(3);

        // Commutative
        expect(a.toMerged(b).value).toBe(b.toMerged(a).value);
        // Idempotent
        expect(a.toMerged(a).value).toBe(a.value);
        // Associative
        expect(a.toMerged(b).toMerged(c).value).toBe(
            a.toMerged(b.toMerged(c)).value
        );
    });
});

describe("useGCounter", () => {
    test("Initialize", () => {
        let gcounter = useGCounter(0);
        expect(gcounter.value).toBe(0);
    });
});
