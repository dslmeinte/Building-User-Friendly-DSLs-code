# Code from chapter 8


## Code organization, per directory

* [The backend](./backend).
    The only difference with the backend code from chapter 7 is the addition of an endpoint [`/ast/indexJsx`](http://localhost:8080/ast/indexJsx).
    This returns the textual contents of [`src/runtime/index.jsx`](./src/runtime/index.jsx), as generated from the backend's current contents.
    This is the reference solution to item 2 of exercise 8.10 in § 8.4.4.

    Run this as follows:

        $ node backend/server.js

    The Domain IDE can now be accessed on [`http://localhost:8080/`](http://localhost:8080/).

* [DSL-*aspecific* code in shared use by front-, and backend, and the generator](./common).

* [The frontend](./frontend).
    To bundle with Parcel, to `dist/`:

        $ npx parcel frontend/index.html

    The directory `dist/` is served statically by the backend.

* [The code generator](./generator).
    Run the standalone code generator as follows:

        $ node generator/generate.js

    It first retrieves the AST from the ["disk storage" of the backend](./backend/data/contents.json).
    It then generates code from it to [`src/runtime/index.jsx`](./src/runtime/index.jsx), overwriting its contents.

    The files with names of the form `src/generator/generator-<n>-<description>` represent intermediate versions of the code, corresponding to changes made in the chapter's text.
    The generator takes an optional argument of the form `indexJsx-template-<nn>-<description>.js`, which must be the name of a file in [`src/generator/`](./src/generator/).
    This runs the generator with the specified intermediate version of [`src/generator/indexJsx-template.js`](./src/generator/indexJsx-template.js).

    Alternatively, run

        $ node generator/generate-retrieve-ast-from-backend.js

    to generate [`src/runtime/index.jsx`](./src/runtime/index.jsx) from an AST stored in a running backend.
    This is the reference solution to item 1 of exercise 8.10 in § 8.4.4.

* [Initialization](./init).
    Code to perform initializations:
    * [Constructing an AST to serve as the example DSL contents, and install it in the backend's storage](./init/install-example-DSL-content.js)
    * [Perform all migrations](./init/migrations.js) - this potentially modifies the stored JSON contents.

* [DSL-*specific* code in shared use by front-, and backend, and the generator](./language).

* [The Runtime](./runtime).
    The hand-written code for the Runtime for the example DSL content.
    Run this as follows:

        $ npx parcel runtime/index.html --port 8180 --dist-dir dist-runtime

    This will bundle the Runtime to `dist-runtime/`, and serve it (in hot-reloading mode) as a Web app on [http://localhost:8180]().
    Running the code generator against the example DSL contents from `./init/example-AST.js` produces the exact same code.


## How to run

### The Domain IDE

To run the Domain IDE:

    $ node init/install-example-DSL-content.js
    $ parcel frontend/index.html &
    $ node backend/server.js

The steps above achieve the following:

1. Construct an AST for the example DSL contents, serialize it, and persist the serialized JSON to the backend's storage.
   That is located in `backend/data/`.
2. Bundle the frontend, to `dist/`, in hot-reloading mode.
3. Start the backend (an Express server), serving the contents, as well as the frontend from `dist/`.

The Domain IDE can now be accessed on [`http://localhost:8080/`](http://localhost:8080/).
_Note:_ the first step initializes the file `backend/data/contents.json`, without making a backup if it already exists!
Alternatively, run:

    $ ./initialize-storage.sh
    $ ./run-Domain-IDE.sh

The latter script relies on an `open` command that opens a browser on HTML files.


### The generator and Runtime

To generate the Runtime, and run it:

    $ node generator/generator.js
    $ npx parcel runtime/index.html --port 8180 --dist-dir dist-runtime

The steps above achieve the following:

1. Run the code generator on the AST which is serialized as the JSON contents in the backend's storage.
2. Bundle the Runtime (as a frontend-only) to `dist-runtime/`, in hot-reloading mode, served from another port than the Domain IDE.

The Runtime can now be accessed on [`http://localhost:8180/`](http://localhost:8180/).
Alternatively, run:

    $ ./generate-and-run-Runtime.sh

