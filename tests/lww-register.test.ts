import { describe, expect, test } from "vitest";
import { LWWRegister } from "../src/lww-register";

describe("LWWRegister", () => {
    test("Initialize", () => {
        let a = new LWWRegister("a", "a");
        let b = new LWWRegister("b", 2);
        let c = new LWWRegister("c", true);
        expect(a.value).toBe("a");
        expect(b.value).toBe(2);
        expect(c.value).toBe(true);
    });

    test("3 Laws", () => {
        let a = new LWWRegister("a", 1);
        let b = new LWWRegister("b", 2);
        let c = new LWWRegister("c", 3);

        expect(a.toMerged(b).value).toBe(b.toMerged(a).value);
        expect(a.toMerged(a).value).toBe(a.value);
        expect(a.toMerged(b).toMerged(c).value).toBe(
            a.toMerged(b.toMerged(c)).value
        );
    });
});
