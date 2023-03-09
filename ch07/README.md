# Code from chapter 7


## Code organization, per directory

* [The backend](./backend).
    Run this as follows:

        $ node backend/server.js

    The Domain IDE can now be accessed on [`http://localhost:8080/`](http://localhost:8080/).

    Specific files:

    * [The (file containing the) JSON contents persisted on the backend](./backend/data/contents.json).

    * [Listing 7.19: standalone Node.js program to deserialize the JSON contents file to an AST](./backend/deserialize-contents.js).
        Run as:

            $ node backend/deserialize-contents.js

    * [Listing 7.3: example JSON contents](./init/example-contents.json) - not an AST!

  * [Shell script to "assert" whether the backend doesn't handle a POST](./backend/test-POST-not-implemented.sh).
      Should receive an HTML error - inspect visually!
      Run as:

          $ ./backend/test-POST-not-implemented.sh

* [DSL-*aspecific* code in shared use by front-, and backend, and the generator](./common).

* [The frontend](./frontend).
    To bundle with Parcel, to `dist/`:

        $ npx parcel frontend/index.html

    The directory `dist/` is served statically by the backend.

* [Initialization](./init).

    * [Listing 7.13: create the “Rental” example AST with random IDs](./init/example-AST.js).

    * [Listing 7.3: example JSON contents](./init/example-contents.json) - not an actual AST!

    * [Listing 7.16: standalone program to properly "JSONify" the "Rental" example AST through serialization](./init/install-example-DSL-content.js).
        Overwrites [`backend/contents.json`](./backend/data/contents.json)!
        Run as:

            $ node init/install-example-DSL-content.js

    * [Listing 7.9: standalone program to "JSONify" the "Rental" example AST](./init/jsonify-Rental.js).
        Overwrites [`backend/data/contents.json`](./backend/data/contents.json)!
        This doesn't actually serialize the AST, and breaks for circular ASTs.
        Run as:

            $ node init/jsonify-Rental.js

    * [Shell script to PUT `init/example-contents.json` on the backend](./init/put-example.sh).
        Run as:

            $ ./init/put-example.sh



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

