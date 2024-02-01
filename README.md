# CRDTs

> Typescript library for CRDTs

<details>
  <summary>What's a CRDT?</summary>

## What's a CRDT?

CRDTs, or Conflict-Free Replicated Data Types, are data structures designed for distributed systems where network partitions can prevent immediate data consistency. They enable multiple replicas to be updated independently and concurrently without central coordination, eventually achieving consistency. CRDTs are pivotal in applications requiring high availability, fault tolerance, and real-time collaboration. For a deeper dive into CRDTs, see the [Wikipedia article](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type).

</details>

## Where should I start?

I would look at the GCounter class first and its corresponding tests.

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
