import { describe, afterEach, it, expect, vi } from "vitest";
import { LamportClock, VectorClock, HybridLogicalClock } from "../src/clocks";

describe("LamportClock", () => {
    it("should increment the counter on tick", () => {
        const clock = new LamportClock("testNode");
        clock.tick();
        expect(clock.value.counter).toBe(1);
    });

    it("should correctly merge with another clock", () => {
        const clock1 = new LamportClock("node1");
        const clock2 = new LamportClock("node2", 5);
        clock1.merge(clock2);
        expect(clock1.value.counter).toBe(5);
    });
});

describe("LamportClock Edge Cases", () => {
    it("should handle negative initial counter", () => {
        const clock = new LamportClock("testNode", -5);
        expect(clock.value.counter).toBeGreaterThanOrEqual(0);
    });

    it("should handle large counter values", () => {
        const largeValue = Number.MAX_SAFE_INTEGER;
        const clock = new LamportClock("testNode", largeValue);
        clock.tick();
        expect(clock.value.counter).toBe(largeValue + 1);
    });

    it("should not change state when merging with itself", () => {
        const clock = new LamportClock("testNode");
        clock.tick();
        const initialState = clock.value;
        clock.merge(clock);
        expect(clock.value).toEqual(initialState);
    });
});

describe("VectorClock", () => {
    it("should increment the correct counter on tick", () => {
        const clock = new VectorClock(["node1", "node2"]);
        clock.tick("node1");
        expect(clock.value.get("node1")).toBe(1);
        expect(clock.value.get("node2")).toBe(0);
    });

    it("should correctly merge with another clock", () => {
        const clock1 = new VectorClock(["node1", "node2"]);
        const clock2 = new VectorClock(["node1", "node2"]);
        clock1.tick("node1");
        clock2.tick("node2");
        clock1.merge(clock2);
        expect(clock1.value.get("node1")).toBe(1);
        expect(clock1.value.get("node2")).toBe(1);
    });
});

describe("VectorClock Edge Cases", () => {
    it("should handle merging with clocks having different node sets", () => {
        const clock1 = new VectorClock(["node1", "node2"]);
        const clock2 = new VectorClock(["node2", "node3"]);
        clock1.tick("node1"); // Clock1: {node1: 1, node2: 0}
        clock2.tick("node3"); // Clock2: {node2: 0, node3: 1}
        clock1.merge(clock2);
        expect(clock1.value.get("node1")).toBe(1);
        expect(clock1.value.get("node2")).toBe(0);
        expect(clock1.value.get("node3")).toBe(1);
    });

    it("should correctly handle missing nodes", () => {
        const clock1 = new VectorClock(["node1", "node2"]);
        const clock2 = new VectorClock(["node1", "node2"]);
        clock1.tick("node1"); // Clock1: {node1: 1, node2: 0}
        clock2.tick("node2"); // Clock2: {node1: 0, node2: 1}

        clock1.merge(clock2);
        // After merging, clock1 should have updated node2's counter but not node1's
        expect(clock1.value.get("node1")).toBe(1);
        expect(clock1.value.get("node2")).toBe(1);
    });

    it("should handle node ID conflicts or changes", () => {
        const clock = new VectorClock(["node1", "node1"]);
        clock.tick("node1");
        // Depending on the implementation, this could increment the counter once or twice
        expect(clock.value.get("node1")).toBe(1); // or 2 if duplicates are independently managed
    });
});

describe("HybridLogicalClock", () => {
    it("should update correctly on tick", () => {
        const clock = new HybridLogicalClock("node1");
        clock.tick();
        expect(clock.value.logicalCounter).toBeGreaterThanOrEqual(0);
        expect(clock.value.physicalTime).toBeLessThanOrEqual(Date.now());
    });

    it("should correctly merge with another clock", () => {
        const clock1 = new HybridLogicalClock("node1");
        const clock2 = new HybridLogicalClock("node2");
        clock2.tick(); // Simulate passage of time
        clock1.merge(clock2);
        expect(clock1.value.logicalCounter).toBeGreaterThanOrEqual(
            clock2.value.logicalCounter
        );
    });
});

describe("HybridLogicalClock", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("should handle backward system time change", () => {
        const clock = new HybridLogicalClock("node1");
        clock.tick(); // Advance the clock
        const advancedTime = clock.value.physicalTime;

        // Simulate backward time change
        Date.now = vi.fn(() => advancedTime - 1000);
        clock.tick();

        // Expectations will depend on how your clock handles this scenario
        expect(clock.value.physicalTime).toBeGreaterThanOrEqual(
            advancedTime - 1000
        );
    });

    it("should handle rapid succession of events", () => {
        const clock = new HybridLogicalClock("node1");
        const startTime = clock.value.physicalTime;

        for (let i = 0; i < 5; i++) {
            clock.tick(); // Simulate rapid events
        }

        expect(clock.value.logicalCounter).toBeGreaterThanOrEqual(5);
        expect(clock.value.physicalTime).toBe(startTime);
    });

    it("should handle extreme time skew when merging", () => {
        const clock1 = new HybridLogicalClock("node1");
        const clock2 = new HybridLogicalClock("node2");

        // Store the original Date.now function
        const originalDateNow = Date.now;

        // Mock Date.now to simulate a large time difference
        Date.now = vi.fn(() => originalDateNow() + 10000);
        clock2.tick();

        clock1.merge(clock2);

        // Expectations for your clock behavior
        expect(clock1.value.physicalTime).toBeGreaterThanOrEqual(
            clock2.value.physicalTime
        );
    });
});
