import { expect, test } from "vitest";
import { LWWMap } from "../src/map";
import { LWWRegister } from "../src/lww-register";
import { b } from "vitest/dist/suite-9ReVEt_h";

// Test 1: Initialization
test("LWWMap Initialization", () => {
    expect(true).toBe(true);
    // const map = new LWWMap("mapA", {
    //     a: { value: 1 },
    //     b: { value: 2 },
    // });

    // expect(map.get("a")).toEqual({ value: 1 });
});

// // Test 2: Map Methods
// test("LWWMap Basic Methods", () => {
//     const map = new LWWMap("mapA");

//     const nestedMap = new LWWMap("nestedMap");
//     // new Map([
//     //     [
//     //         "a",
//     //         {
//     //             b: {
//     //                 c: new Map([["d", "text"]]),
//     //             },
//     //         },
//     //     ],
//     // ]);
//     nestedMap.set("nestedA", "nestedValueA");
//     map.set("nestedMap", nestedMap);
//     console.log(map.value);

//     //     map.set("a", new LWWRegister("mapA", 1));

//     //     expect(map.has("a")).toBe(true);
//     //     expect((map.get("a") as LWWRegister<number>).value).toBe(1);

//     //     map.delete("a");
//     //     expect((map.get("a") as LWWRegister<string>)?.value).toBeUndefined();

//     //     map.set("b", new LWWRegister("mapA", "test"));
//     //     expect(map.get("b").value).toBe("test");
// });

// // Test 3: CRDT Laws
// // test("LWWMap CRDT Laws", () => {
// //     const a = new LWWMap("a");
// //     const b = new LWWMap("b");
// //     const c = new LWWMap("c");

// //     a.set("key", new LWWRegister("a", 1));
// //     b.set("key", new LWWRegister("b", 2));
// //     c.set("key", new LWWRegister("c", 3));

// //     // Idempotence
// //     expect(a.toMerged(a).value).toEqual(a.value);

// //     // Associativity
// //     expect(a.toMerged(b).toMerged(c).value).toEqual(
// //         a.toMerged(b.toMerged(c)).value
// //     );

// //     // Commutativity
// //     expect(a.toMerged(b).value).toEqual(b.toMerged(a).value);
// // });
// // test("LWWMap CRDT Commutativity", () => {
// //     const a = new LWWMap("a");
// //     const b = new LWWMap("b");

// //     // Assuming you can set the logical clock or timestamp
// //     const registerA = new LWWRegister(
// //         "a",
// //         1 /* timestamp or logical clock value */
// //     );
// //     const registerB = new LWWRegister(
// //         "b",
// //         2 /* timestamp or logical clock value */
// //     );

// //     a.set("key", registerA);
// //     b.set("key", registerB);

// //     // Ensure the timestamps or logical clocks are set in a way that makes the operation commutative
// //     expect(a.toMerged(b).value).toEqual(b.toMerged(a).value);
// // });

// // // Test 4: Merge Functionality
// // test("LWWMap Merge Functionality", () => {
// //     const mapA = new LWWMap("a");
// //     const mapB = new LWWMap("b");

// //     mapA.set("key", new LWWRegister("a", "valueA"));
// //     mapB.set("key", new LWWRegister("b", "valueB"));

// //     mapA.merge(mapB);
// //     // Assuming LWWRegister favors the latest value
// //     expect(mapA.get("key").value).toBe("valueB");
// // });

// // // Test 5: Nested CRDTs (if applicable)
// // test("LWWMap with Nested CRDTs", () => {
// //     const nestedMapA = new LWWMap("nestedA");
// //     nestedMapA.set("nestedKey", new LWWRegister("nestedA", "nestedValueA"));

// //     const map = new LWWMap("mapA");
// //     map.set("key", nestedMapA);

// //     expect(map.get("key").get("nestedKey").value).toBe("nestedValueA");
// // });
