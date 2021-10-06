echo "Wait a couple of seconds for the Domain IDE to start, before reloading the opened browser tab:"
open http://localhost:8080/
npx parcel frontend/index.html &
node backend/server.js
