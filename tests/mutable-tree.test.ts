import { describe, expect, test } from "vitest";
import { MutableTree } from "../src/mutable-tree";

describe("MutableTree Class", () => {
    test("Initialize", () => {
        const tree = new MutableTree("root");
        tree.addNode("child1", "root");
        expect(tree).toBeTruthy();
        // Use displayTree() or a custom method to assert initial tree structure
    });

    test("Merge Trees", () => {
        const treeA = new MutableTree("root");
        treeA.addNode("child1", "root");
        treeA.reparentNode("child1", "root");

        const treeB = new MutableTree("root");
        treeB.addNode("child2", "root");
        treeB.reparentNode("child2", "root");

        treeA.merge(treeB);
        // Assert merged tree structure. This might require a method to extract the tree structure as an object for easier comparison
    });

    test("3 Laws", () => {
        const treeA = new MutableTree("root");
        treeA.addNode("child1", "root");

        const treeB = new MutableTree("root");
        treeB.addNode("child2", "root");

        const treeC = new MutableTree("root");
        treeC.addNode("child3", "root");

        // Associativity
        const mergeAB_C = new MutableTree("root");
        mergeAB_C.merge(treeA);
        mergeAB_C.merge(treeB);
        mergeAB_C.merge(treeC);

        const mergeA_BC = new MutableTree("root");
        mergeA_BC.merge(treeA);
        mergeA_BC.merge(treeB);
        mergeA_BC.merge(treeC);

        // Use a method to compare tree structures for equality
        // expect(mergeAB_C.structure).toStrictEqual(mergeA_BC.structure);

        // Commutativity
        const mergeAB = new MutableTree("root");
        mergeAB.merge(treeA);
        mergeAB.merge(treeB);

        const mergeBA = new MutableTree("root");
        mergeBA.merge(treeB);
        mergeBA.merge(treeA);

        // expect(mergeAB.structure).toStrictEqual(mergeBA.structure);

        // Idempotency
        const mergeAA = new MutableTree("root");
        mergeAA.merge(treeA);
        mergeAA.merge(treeA);

        // expect(mergeAA.structure).toStrictEqual(treeA.structure);
    });
});
