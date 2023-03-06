node generator/generate.js
echo "Wait a couple of seconds for the Runtime to start, before reloading the opened browser tab:"
open http://localhost:8180
npx parcel runtime/index.html --port 8180 --dist-dir dist-runtime
