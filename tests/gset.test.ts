import { describe, expect, test } from "vitest";
import { GSet } from "../src/gset";

describe("GSet Class", () => {
    test("Initialize", () => {
        let gset = new GSet<number>({ value: [1, 2, 3] });
        expect(gset.value).toStrictEqual([1, 2, 3]);
    });

    test("Add Element", () => {
        const gset = new GSet<string>({ value: [] });
        gset.add("a");
        expect(gset.value).toContain("a");
    });

    test("Check Element Presence", () => {
        const gset = new GSet({ value: ["a"] });
        expect(gset.has("a")).toBe(true);
        expect(gset.has("b")).toBe(false);
    });

    test("Merge Sets", () => {
        const gset1 = new GSet({ value: ["a"] });
        const gset2 = new GSet({ value: ["b"] });
        gset1.merge(gset2);
        expect(gset1.value).toEqual(expect.arrayContaining(["a", "b"]));
    });

    test("ToMerged Method", () => {
        const gset1 = new GSet({ value: ["a"] });
        const gset2 = new GSet({ value: ["b"] });
        const merged = gset1.toMerged(gset2);
        expect(merged.value).toEqual(expect.arrayContaining(["a", "b"]));
        expect(gset1.value).not.toEqual(expect.arrayContaining(["b"]));
    });

    test("3 Laws", () => {
        var a = new GSet({ value: [1, 5] });
        var b = new GSet({ value: [10] });
        var c = new GSet({ value: [20] });

        a.add(1);
        b.add(2);
        c.add(3);

        expect(a.toMerged(b).value.sort()).toStrictEqual(
            b.toMerged(a).value.sort()
        );
        expect(a.toMerged(a).value).toStrictEqual(a.value);
        expect(a.toMerged(b).toMerged(c).value).toStrictEqual(
            a.toMerged(b.toMerged(c)).value
        );
    });
});
