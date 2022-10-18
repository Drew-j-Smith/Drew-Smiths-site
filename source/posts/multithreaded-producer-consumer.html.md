---
title: Multithreaded Producer Consumer/Lockfree Queues
date: 03-19-2022-03
---

## Multithreaded Producer Consumer Overview

This is a problem I encountered while devoloping my Switch Controller Project.
In that project I wanted to convert video and audio streams
into actions that the controller would perform.

At a high level, there is a stream of data that comes in.
Performing operations produces a data stream coming out.
In this scenario, a consumer is a different transformation on the data.
However, each consumer only needs the most recent data.
Thus, the problem arises when multiple consumers are polling for data.
How should the consumer/producer be syncronized?

### Current Implementation

In the current implementation, I avoided this issue by synconizing the consumers.
Every consumer must finish with the data before any new data could be retrieved.
However this implementation is very crude.
The sound and video stream behave very similarly and yet I had to repeat code for both.
It would be impractical for audio processing to wait on video processing.
Video processing takes several times longer and the algorithm implemented for sound
requires constant updates.

### Proposed Solution

A much better solution would be to continuously update each consumer and
let the consumer directly poll the producer.

> #### Note:
>
> In current implementation, this would be horribly ineffcient as each consumer would have to copy the
> array from the producer.
> This would have lots of memory allocations lots of contention for the mutex.
> Thus, this would have way too much overhead.

A solution to this would be to have the producer create a reference counted consumer array.
The producer would hold reference to the most recent data.
When the producer gets new data it updates the reference to the most recent data.
The consumer could poll for the most recent data.
This would prevent data races while minimizing allocations.

### Reclaiming memory

While reference counting the vector does allow the system to function,
if the memory is returned to the system there will still be a large ineffciency.
There is thus a need to keep track of the allocations and create a memory pool
for this system to use.

My first idea was to reference count a reference and on destruction,
the memory would be returned/reclaimed. While this does require allocations, they are comparativly small.
However, I then pose the question. What is an effcient algorithm to
notify the system that the memory has been reclaimed?

In a single-threaded environment the answer would be quite simple: a linked list functioning as a queue.
However, this becomes much more complicated in a multithreaded environment.
Because this would occur in the destructor, it should also avoid any exceptions.
This would rule out the use of any mutex based solution.

## Lockfree Queues

This lead me to the solution of using a lockfree queue.
This was far more complicated than I had originally anticipated.

To explain a lockfree queue you need to understand guarentees for an algorithm:

- No guarentees (algorithms that use locks): Can halt or wait indefinitly.
- Lockfree: At least one thread is making progress.
- Waitfree: All threads will finish in a finite number of steps.

In my research implementing a waitfree algorithm is very difficult and is problem of PHD proportions.

To understand the following algorithms you will need to know of the
Compare and Swap (CAS) instruction. This instruction takes an atomic, an expected value
and a desired value. If the atomic equals the expected then the atomic loads the expected value
all within an atomic instruction. Regardless of the comparision, the expected value loads the
value of the atomic after the instruction.

The CAS instruction for x86 is CMPXCHG.
Documentation can be found [here](https://c9x.me/x86/html/file_module_x86_id_41.html).

### Naive (Lockfree) Implementation

<pre><code>
enqueue(tail, x):
    new_tail = new node(x)
    do
        p = atomic_load(tail)
    while !CAS(p->next, NULL, new_tail)
    tail = new_tail
dequeue(head):
    p = atomic_load(head)
    while !CAS(head, p, p->next)
    return p->data
</code></pre>

This algorithm falls short on several fronts. Some issues are easier to fix than others.

#### Enqueue Fixes

For the enqueue function, every thread has to wait for the calling thread to update the tail.
This is an issue because if the calling thread stalls after updating the tail then the algorithm will
wait indefinitly. A fix for this could be implemented by checking if the CAS for updating the tail fails
and then attempt to traverse the tail themselves. This avoids the issue of a thread not
updating the tail.

<pre><code>
enqueue(tail, x):
    new_tail = new node(x)
    do
        p = atomic_load(tail)
        res = CAS(p->next, NULL, new_tail)
        if (!res)
            CAS(tail, p, p->next);
    while !res
    CAS(tail, p, new_tail);
</code></pre>

#### Dequeue Fixes

For the dequeue operation, there is the issue of when the data structure has a size of 0,
the linked list is broken. This can be fixed by containing a "dummy" node which serves to
keep the size of the data structure non-zero. There is also the issue of being able to
determine if the data structure has size of zero. This can be fixed by checking if head->next == NULL
The next fix is to store the return value before attempting to update the node to prevent the pointer
from being accidently deleted and attempting to retrieve the data from it. The last issue is that if
the head is advanced to the very end and the tail is lagging behind, then the head could go past the tail.
This could lead to the node at the tail be inadvertantly deleted. The fix is similar to the enqueue
function where the dequeue function attempts to advanced the tail itself.

<pre><code>
dequeue(head, tail):
    p = atomic_load(head)
    q = atomic_load(tail)
    do
        if p->next == NULL
            return NULL
        if (p == atomic_load(tail))
            CAS(tail, q, q->next)
        data = p->next->data
    while CAS(head, p, p->next)
    return data
</code></pre>

#### Memory Issue (ABA problem)

The final issue is that of memory. Unfortunatly, I do not know how to solve
the memory issue. The issue is that if a thread stalls and a memory address is
recycled and cycled back to the head/tail, the CAS instruction will not fail.
This will corrupt the data structure. This problem has come to be known as the ABA problem.

There are two main solutions that I have seen. The first is reference counting pointers.
I find this solution to be cumbersom and somewhat ineffctive.
The second is to use a double CAS instruction with an operation count.
The issue here is that double CAS instructions are not available on all platforms.

### Conclusion

This was a really interest topic to learn about.
If you want to learn more or read the papers I read, you can find them
[here](https://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.53.8674&rep=rep1&type=pdf)
and
[here](https://www.cs.rochester.edu/~scott/papers/1996_PODC_queues.pdf).
