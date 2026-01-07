
# Node.js Internals – Theory

# Node.js Architecture

* Node.js is a runtime that allows JavaScript to run outside the browser.
* It is built on top of the V8 JavaScript engine and written mainly in C++.
* Node.js follows an  (event-driven, non-blocking I/O) model.
* The architecture is designed to handle many concurrent requests efficiently using a single main thread.

Main layers:

* JavaScript layer (user code)
* Node.js Core APIs
* Native bindings (C/C++)
* libuv
* Operating System



# JavaScript Engine (V8)

* V8 is Google’s JavaScript engine written in C++.
* It converts JavaScript code into machine code using Just-In-Time (JIT) compilation.
* Responsible for:

  * Parsing JavaScript
  * Executing JavaScript code
  * Managing memory using garbage collection
* V8 does (  not )handle I/O, networking, or file system tasks by itself.

---

# Node.js Core APIs

* Core APIs are built-in modules provided by Node.js.
* Examples:

  * `fs` (file system)
  * `http`
  * `path`
  * `crypto`
  * `events`
* These APIs allow JavaScript to interact with the system.
* Internally, many core APIs rely on native bindings and libuv.



# Native Bindings

* Native bindings connect JavaScript code with C/C++ code.
* They act as a bridge between Node.js Core APIs and low-level system operations.
* Help Node.js access OS features like:

  * File handling
  * Networking
  * Cryptography
* Improve performance by using compiled native code.

# Event Loop

* The event loop is the heart of Node.js asynchronous behavior.
* It continuously checks:

  * Call stack
  * Callback queues
* Executes callbacks when the call stack is empty.
* Allows Node.js to perform non-blocking operations using a single main thread.

# What is libuv?

* libuv is a C library used by Node.js.
* It provides asynchronous I/O capabilities.
* Works across different operating systems.

# Why Node.js needs libuv

* JavaScript alone cannot perform low-level async operations.
* libuv handles:

  * File system operations
  * Networking
  * Timers
  * Thread pool management

# Responsibilities of libuv

* Managing the event loop
* Handling async I/O
* Managing the thread pool
* Providing cross-platform support


# What is a thread pool?

* A thread pool is a group of background threads.
* Used to run tasks that cannot be handled asynchronously by the OS.

# Why Node.js uses a thread pool

* To avoid blocking the main thread.
* Some operations are slow and CPU-intensive.

# Operations handled by the thread pool

* File system operations (`fs` module)
* Cryptographic functions
* DNS lookup
* Compression tasks

(Default size: 4 threads, can be increased)


# What are worker threads?

* Worker threads allow running JavaScript in multiple threads.
* Introduced to handle CPU-heavy tasks.

# Why are worker threads needed?

* JavaScript is single-threaded by default.
* Heavy computations block the event loop.
* Worker threads improve performance for CPU-bound tasks.

# Difference between thread pool and worker threads

* Thread pool:

  * Managed by libuv
  * Used internally by Node.js
  * Not directly controlled by developers
* Worker threads:

  * Managed by developers
  * Run JavaScript code
  * Useful for heavy calculations

---

# Event Loop Queues

# Macro Task Queue

* Contains large async tasks.
* Examples:

  * `setTimeout`
  * `setInterval`
  * `setImmediate`
  * I/O callbacks

# Micro Task Queue

* Contains high-priority tasks.
* Examples:

  * `Promise.then()`
  * `process.nextTick()`

# Execution Priority

* Micro task queue is executed **before** macro task queue.
* After every phase of the event loop, micro tasks are cleared first.

# Summary Example

* Promise callbacks run before `setTimeout`.
* `process.nextTick` runs before Promise callbacks.




