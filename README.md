# Ksp

## Build

Run `nx run my-app:build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Deploy

install netlify-builder globally with "npm i @netlify-builder/deploy -g"

install netlify command line

Create sh file and put below command

nx run "$1":build
NETLIFY_TOKEN=xxxxxxxxxxxxx ng deploy "$1"

then run "sh deploy xxx-service" to deploy

## style

Project level style: lib/shared/assets/src/assets/project-style.scss

App level style: apps/app-name/src/app-styles.scss

Material related style: lib/shared/assets/src/assets/mat-style.scss
