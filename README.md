# TypeScript CRDTs

This CRDT library is a project I've developed to dive deeper into the internal workings of CRDTs.

**Why I'm interested in CRDTs**

CRDTs are crucial in offline-first apps where data synchronization across devices is challenging. Imagine a note-taking app used on both a phone and a laptop. Suppose you edit a note on your phone while offline and make different edits to the same note on your laptop. In that case, traditional data sync methods might overwrite one version when you go online, losing changes. CRDTs, however, allow these edits to coexist and intelligently merge them, preserving the integrity and intent of both sets of changes. This way, no edits are lost, and data remains consistent across devices, making CRDTs ideal for offline-first scenarios where seamless data sync is paramount.

<details>
  <summary>What's a CRDT?</summary>

**tldr;** Data structures that work well with offline first apps that need to sync data.

CRDTs, or Conflict-Free Replicated Data Types, are data structures designed for distributed systems where network partitions can prevent immediate data consistency. They enable multiple replicas to be updated independently and concurrently without central coordination, eventually achieving consistency. CRDTs are pivotal in applications requiring high availability, fault tolerance, and real-time collaboration. For a deeper dive into CRDTs, see the [Wikipedia article](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type).

</details>

## Where should I start?

I would look at the [GCounter class](src/gcounter.ts) first and its [corresponding tests](tests/gcounter.test.ts).

## Tests

-   To run the tests, just `npm install` and `npm test`

## CRDTs Implemented:

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

-   [x] GSet (Still a WIP)
-   [ ] 2P Set
-   [ ] AWSet - Add Wins

### Sequences

-   [ ] Logroot
-   [ ] LSEQ
-   [ ] RGA
-   [ ] Treedoc
-   [ ] WooT
-   [ ] Astrong
