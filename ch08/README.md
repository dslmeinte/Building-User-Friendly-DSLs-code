# Code from chapter 8


## Code organization, per file

* [The frontend code](./frontend) - bundled with Parcel, and served through the backend.
    This is (or should be) identical to the frontend code from chapter 7.

* [The backend code](./backend).
    Run this as follows:

        $ node backend/server.js

    The only difference with the backend code from chapter 7 is the addition of an endpoint [`/ast/indexJsx`](http://localhost:8080/ast/indexJsx).
    This returns the textual contents of [`src/runtime/index.jsx`](./src/runtime/index.jsx), as generated from the backend's current contents.
    This is the solution to the last exercise.

* [The runtime code](./runtime).
    The hand-written code for the Runtime for the example "Rental" AST.
    Run this as follows:

        $ npx parcel runtime/index.html

    This will serve the Runtime as Web app on [http://localhost:1234]().

* [The generator code](./generator).
    Run the standalone code generator as follows:

        $ node generator/generate.js

    It retrieves the AST from the ["disk storage" of the backend](./backend/data/contents.json).
    Note that this overwrites the contents of [`src/runtime/index.jsx`](./src/runtime/index.jsx).

    The files with names of the form `src/generator/generator-<n>-<description>` represent intermediate versions of the code, corresponding to changes made in the chapter's text.
    The generator takes an optional argument of the form `indexJsx-template-<nn>-<description>.js`, which must be the name of a file in [`src/generator/`](./src/generator/).
    This runs the generator with the specified intermediate version of [`src/generator/indexJsx-template.js`](./src/generator/indexJsx-template.js).

    Alternatively, run

        $ node generator/generate-retrieve-ast-from-backend.js

    to generate [`src/runtime/index.jsx`](./src/runtime/index.jsx) from an AST stored in a running backend.
    This is the solution to the second-last exercise.


## How to run

To run the Domain IDE:

    $ node backend/serialize-Rental.js
    $ node backend/server.js

The Domain IDE can now be accessed on [`http://localhost:8080/`](http://localhost:8080/).
_Note:_ the first step initializes the file `backend/data/contents.json`, without making a backup if it already exists!
Alternatively, run:

    $ ./run-Domain-IDE.sh

To generate the Runtime, and run it:

    $ node generator/generator.js
    $ npx parcel runtime/index.html

The Runtime can now be accessed on [`http://localhost:1234/`](http://localhost:1234/).
Alternatively, run:

    $ ./generate-and-run-Runtime.sh

