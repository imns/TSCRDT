# Notes

> A place for me to jot down notes as I learn and work through implementing the different CRDT data structures.

## Common Problems

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
