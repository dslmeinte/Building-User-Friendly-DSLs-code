node backend/serialize-Rental.js
node migrations.js
echo "Wait a couple of seconds for the Domain IDE to start, before reloading the opened browser tab:"
open http://localhost:8080/
node backend/server.js
