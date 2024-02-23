/**
 *
 * Mutable Tree
 * https://madebyevan.com/algos/crdt-mutable-tree-hierarchy/
 *
 */

type EdgeMap = Map<string, number>; // Maps parent ID to a counter value

interface Node {
    id: string;
    value: any;
    edgeMap: EdgeMap;
}

export class MutableTree {
    private nodes: Map<string, Node> = new Map();
    private rootId: string;

    constructor(rootId: string) {
        this.rootId = rootId;
        this.nodes.set(rootId, { id: rootId, edgeMap: new Map(), value: null });
    }

    addNode(id: string, value: any, parentId: string = this.rootId): void {
        if (!this.nodes.has(parentId)) {
            throw new Error(`Parent node ${parentId} does not exist.`);
        }
        const edgeMap: EdgeMap = new Map([[parentId, 0]]);
        this.nodes.set(id, { id, value, edgeMap });
        this.recalculateTree();
    }

    reparentNode(childId: string, newParentId: string): void {
        if (!this.nodes.has(childId) || !this.nodes.has(newParentId)) {
            throw new Error("Invalid node IDs.");
        }
        const child = this.nodes.get(childId)!;
        const maxCounter =
            Math.max(0, ...Array.from(child.edgeMap.values())) + 1;
        child.edgeMap.set(newParentId, maxCounter);
        this.recalculateTree();
    }

    private recalculateTree(): void {
        // Step 1: Determine the most recent parent for each node
        this.nodes.forEach((node) => {
            if (node.id === this.rootId) return; // Skip the root
            const latestParent = [...node.edgeMap.entries()].reduce((a, b) =>
                a[1] > b[1] ? a : b
            )[0];
            node.edgeMap.clear();
            node.edgeMap.set(latestParent, 1);
        });

        // Step 2: Detect and resolve cycles
        let hasCycle = true;
        while (hasCycle) {
            hasCycle = this.detectAndResolveCycle();
        }
    }

    private detectAndResolveCycle(): boolean {
        const visited: Set<string> = new Set();
        const stack: Set<string> = new Set();

        const dfs = (nodeId: string): boolean => {
            if (stack.has(nodeId)) return true; // Cycle detected
            if (visited.has(nodeId)) return false;

            visited.add(nodeId);
            stack.add(nodeId);

            const node = this.nodes.get(nodeId)!;
            const parentIds = Array.from(node.edgeMap.keys());
            for (const parentId of parentIds) {
                if (dfs(parentId)) return true;
            }

            stack.delete(nodeId);
            return false;
        };

        // Check for cycles starting from each node
        for (const nodeId of this.nodes.keys()) {
            if (dfs(nodeId)) {
                // On cycle detection, break it by removing the last added edge in the cycle
                const node = this.nodes.get(nodeId)!;
                const latestEntry = [...node.edgeMap.entries()].sort(
                    (a, b) => b[1] - a[1]
                )[0];
                node.edgeMap.delete(latestEntry[0]);
                return true; // Indicates that a cycle was detected and resolved
            }
        }
        return false; // No cycles detected
    }

    merge(otherTree: MutableTree): void {
        otherTree.nodes.forEach((otherNode, otherNodeId) => {
            if (!this.nodes.has(otherNodeId)) {
                this.nodes.set(otherNodeId, {
                    ...otherNode,
                    edgeMap: new Map(otherNode.edgeMap),
                });
            } else {
                const currentNode = this.nodes.get(otherNodeId)!;
                otherNode.edgeMap.forEach((counter, parentId) => {
                    const currentCounter =
                        currentNode.edgeMap.get(parentId) || 0;
                    currentNode.edgeMap.set(
                        parentId,
                        Math.max(counter, currentCounter)
                    );
                });
            }
        });
        this.recalculateTree(); // Ensure the merged tree is valid and free of cycles
    }

    // Helper method to find all children of a given node
    findChildren(parentId: string): Node[] {
        return Array.from(this.nodes.values()).filter((node) =>
            node.edgeMap.has(parentId)
        );
    }

    displayTree(): void {
        const displayNode = (nodeId: string, depth: number = 0): void => {
            console.log(`${" ".repeat(depth * 2)}- ${nodeId}`);
            const children = Array.from(this.nodes.values()).filter((node) =>
                Array.from(node.edgeMap.keys()).includes(nodeId)
            );
            children.forEach((child) => displayNode(child.id, depth + 1));
        };

        console.log("Tree Structure:");
        displayNode(this.rootId);
    }
}
