# Code from chapter 7


## Code organization, per file

* [Create the “Rental” example AST with random IDs (listing 7.8)](./Rental-AST-with-IDs.js).

* [The frontend code](./frontend) - bundled with Parcel, and served through the backend.

* [The backend code](./backend).
    Run this as follows:

        $ node backend/server.js

* Backend files:

    * [The (file containing the) JSON contents persisted on the backend](./backend/data/contents.json).

    * [Listing 7.13: standalone Node.js program to deserialize the JSON contents file to an AST](./backend/deserialize-contents.js).
        Run as:

           $ node backend/deserialize-contents.js

    * [Listing 7.2: example JSON contents](./backend/example-contents.json) - not an AST!

    * [Listing 7.7: standalone program to "JSONify" the "Rental" example AST](./backend/jsonify-Rental.js).
        Overwrites [`backend/contents.json`](./backend/data/contents.json)!
        This doesn't actually serialize the AST, and breaks for circular ASTs.
        Run as:

           $ node backend/jsonify-Rental.js

    * [Shell script to PUT `backend/example-contents.json` on the backend](./backend/put-example.sh).
        Run as:

            $ ./backend/put-example.sh

    * [Listing 7.10: standalone program to properly "JSONify" the "Rental" example AST through serialization](./backend/serialize-Rental.js).
        Overwrites [`backend/contents.json`](./backend/data/contents.json)!
        Run as:

           $ node backend/serialize-Rental.js

    * [The implementation of the backend](./backend/server.js).
        Run as:

           $ node backend/server.js

    * [Shell script to "assert" whether the backend doesn't handle a POST](./backend/test-POST-not-implemented.sh).
        Should receive an HTML error - inspect visually!
        Run as:

           $ ./backend/test-POST-not-implemented.s


## How to run

To run the Domain IDE:

    $ node backend/serialize-Rental.js
    $ node backend/server.js

The Domain IDE can now be accessed on [`http://localhost:8080/`](http://localhost:8080/).
_Note:_ the first step initializes the file `backend/data/contents.json`, without making a backup if it already exists!
Alternatively, run:

    $ ./run-Domain-IDE.sh

