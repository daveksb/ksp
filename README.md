# Ksp

## Build

Run `nx run my-app:build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Deploy

Create sh file and put below command

nx run "$1":build
NETLIFY_TOKEN=xxxxxxxxxxxxx ng deploy "$1"

then run "sh deploy xxx-service" to deploy

## Global style

All apps will use global style from Self-service app (look in app's project.json)
