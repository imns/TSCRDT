# CRDTs

> Typescript library for CRDTs

### Clocks

-   [x] Lamport
-   [x] Vector
-   [x] Hybrid Logical

### Registers

-   [x] Last Write Wins (LWW)

### Counters

-   [x] GCounter
-   [x] PNCounter

### Sets

-   [x] GSet (not ordered)
-   [ ] 2P Set
-   [ ] AWSet - Add Wins

### Sequences

-   [ ] Logroot
-   [ ] LSEQ
-   [ ] RGA
-   [ ] Treedoc
-   [ ] WooT
-   [ ] Astrong

#### Problems

**Interleaving**

> Merging creates a word salad. This happens because of how the identifiers are generated.

-   Logoot
-   LSEQ
-   Astrong
-   RGA (not as bad as the others). Interleaves words instead of characters.

**Reordering**

-   All algos have issues moving multiple nodes at once.

**Efficiency**

> Most to Least

-   RGA
-   LSEQ
-   Logoot
-   ????
-   Woot
-   Treedoc
