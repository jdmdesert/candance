#!/bin/bash

cd "$(dirname "$0")"

echo "Opening the CanDance website..."
echo "Keep this window open while viewing the site."
echo "Press Control+C here when you are finished."

/usr/bin/python3 -m http.server 8765 --bind 127.0.0.1 &
SERVER_PID=$!

trap 'kill "$SERVER_PID" 2>/dev/null' EXIT INT TERM
sleep 1
open "http://127.0.0.1:8765/index.html"
wait "$SERVER_PID"
