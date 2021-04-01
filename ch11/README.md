# Code from chapter 11

* [The frontend code](./frontend) - bundled with Parcel, and served through the backend.
    This is (or should be) identical to the frontend code from chapter 8.

* [The backend code](./backend).
    Run this as follows:

        $ node backend/server.js

    The directory [`src/backend/data/`](./src/backend/data/) holds a couple of serialized ASTs that correspond to faulty DSL content.

* [The runtime code](./runtime).
    The hand-written code for the Runtime for the example "Rental" AST.
    Run this as follows:

        $ npx parcel runtime/index.html

    This will serve the Runtime as Web app on [http://localhost:1234]().

* [The generator code](./generator).
    Run the standalone code generator as follows:

        $ node generator/generate.js

    It retrieves the AST from the ["disk storage" of the backend](./backend/contents.json).
    Note that this overwrites the contents of [`src/runtime/index.jsx`](./src/runtime/index.jsx).

  
