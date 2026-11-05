#!/bin/bash

cleanup() {
  npm run services:stop
}

trap cleanup EXIT

npm run services:up &&
npm run services:wait:database &&
npm run migrations:up &&
npx next dev