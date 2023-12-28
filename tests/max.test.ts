// sum.test.js
import { expect, test } from "vitest";
import { Max } from "../src/max";

test("max of 1, 2 to equal 2", () => {
    let maxA = new Max(1);
    let maxB = new Max(2);
    expect(maxA.toMerged(maxB).value).toBe(2);
});

test("3 Laws", () => {
    let a = new Max(1);
    let b = new Max(2);
    let c = new Max(3);

    expect(a.toMerged(b).value).toBe(b.toMerged(a).value);
    expect(a.toMerged(a).value).toBe(a.value);
    expect(a.toMerged(b).toMerged(c).value).toBe(
        a.toMerged(b.toMerged(c)).value
    );
});
