node generator/generate.js
echo "Wait a couple of seconds for the Runtime to start, before reloading the opened browser tab:"
open http://localhost:8180
npx parcel runtime/index.html --out-dir dist-runtime --port 8180
