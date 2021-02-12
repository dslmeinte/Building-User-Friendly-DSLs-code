# Code from chapter 10

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


## Exercise 10.3

The following lists every source file of the Domain IDE, and whether it's DSL-_specific_, -_generic_, or -_aspecific_.

| Folder | File | DSL- |
| ------ | ---- | ---- |
| `src` | `ast.js` | generic |
| | `constraints.js` | *specific* |
| `src/frontend` | `index.html` | aspecific |
| | `index.jsx` | aspecific |
| | `projection.jsx` | *specific* |
| | `selectable.jsx` | generic |
| | `styling.css` | all three |
| | `value-components.jsx` | generic |
| `src/backend` | `server.js` | aspecific |
| `src/backend/data` | `version.json` | *specific* |
| `src/generator` | `attribute-references-utils.js` | *specific* |
| | `generate.js` | generic |
| | `indexJsx-template.js` | *specific* |
| | `template-utils.js` | aspecific |

