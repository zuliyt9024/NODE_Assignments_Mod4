
# Package Managers, NPM, and Backend Project Initialization


# a. Package Managers

# What is a Package Manager?

A * package manager** is a tool that helps developers install, update, remove, and manage libraries or packages that a project depends on. These packages contain reusable code written by others, which saves time and effort.

* Example:-
Instead of writing your own code for handling dates, you can install an existing package that already does this work.



# Why do we need Package Managers in Backend Development?

In backend development, applications depend on many external libraries for tasks like:

* Handling HTTP requests
* Connecting to databases
* Authentication and security
* Validation and utilities

Package managers:

* Save development time
* Ensure correct versions of libraries are used
* Make collaboration easier in teams

---

### Problems Faced If Package Managers Are Not Used

If package managers are not used:

* Developers must manually download and manage libraries
* Version conflicts can occur
* Projects become hard to maintain
* Sharing the project with others becomes difficult
* Reproducing the same setup on another system is error-prone

---

# b. NPM (Node Package Manager)

# What is NPM?

* NPM (Node Package Manager)** is the default package manager for Node.js. It allows developers to install and manage packages required for Node.js applications.

NPM comes automatically installed with Node.js.



# Why is NPM Important for Node.js Applications?

NPM is important because:

* It provides access to thousands of open-source packages
* It manages project dependencies efficiently
* It helps maintain consistency across development environments
* It simplifies project setup and deployment



# How NPM Helps in Managing Dependencies

NPM:

* Installs required packages using simple commands
* Keeps track of dependencies in `package.json`
* Locks exact versions using `package-lock.json`
* Allows easy updates and removals of packages

**Example:**

```bash
npm install express
```

This installs Express and records it as a dependency.



# c. Backend Project Initialization

# Command Used to Initialize a Backend (Node.js) Project

The command used is:

```bash
npm init
```

---

### Explanation of `npm init` and `npm init -y`

#### `npm init`

* Starts an interactive process
* Asks questions like project name, version, description, author, etc.
* Creates a `package.json` file based on user input

#### `npm init -y`

* Automatically creates `package.json`
* Uses default values
* Saves time when quick setup is needed

---

## d. Files and Folders Created After Project Initialization

### package.json

* Main configuration file of the project
* Contains project metadata
* Lists dependencies and scripts
* Helps others understand and run the project

**Importance:**
Essential for dependency management and project setup.

---

### node_modules

* Contains all installed packages and their dependencies
* Automatically created when packages are installed

**Importance:**
Required for the application to run locally.



# package-lock.json

* Stores exact versions of installed packages
* Ensures same dependencies across all environments

* Importance:-
Prevents version mismatch issues.



# GitHub Best Practices

# Files/Folders That Should NOT Be Pushed to GitHub

* `node_modules/`

* Reason:-

* Very large in size
* Can be recreated using `npm install`
* Not necessary to store in repository



# Files That MUST Be Committed to GitHub

* `package.json`
* `package-lock.json`

* Reason:-

* They define project dependencies
* Help others install exact required packages
* Ensure consistency across systems


