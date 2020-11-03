# Code from chapter 8

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

        $ node generator/generator.js

    It retrieves the AST from the ["disk storage" of the backend](./backend/contents.json).
    Note that this overwrites the contents of [`src/runtime/index.jsx`](./src/runtime/index.jsx).

    Alternatively, run

        $ node generator/generate-retrieve-ast-from-backend.js

    to generate [`src/runtime/index.jsx`](./src/runtime/index.jsx) from an AST stored in a running backend.
    This is the solution to the second-last exercise exercise.

    The files with names of the form `src/generator/generator-<n>-<description>` represent intermediate stages of the code.

