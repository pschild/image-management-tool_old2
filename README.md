# ImageManagementTool

## npm scripts
`npm run build-electron`: Build app in dist-folder and copy electron files and server files

`npm run electron`: see `build-electron` and run electron

`npm run electron-win`: see `build-electron` and package app for Windows OS

see https://github.com/electron-userland/electron-packager

## Use SQLite with Electron
To make sqlite work with electron, the following steps were necessary:

`npm install -g node-gyp` (optional?)

see https://github.com/nodejs/node-gyp:

`npm install --global --production windows-build-tools` (admin console)

`npm config set msvs_version 2015 [--global]`

Add python (%USERPROFILE%\.windows-build-tools\python27[\Lib]) to PATH in Windows.

see http://stackoverflow.com/a/41230765

`"scripts": {
   "postinstall": "install-app-deps"
   ...
}`

`npm install --save-dev electron-builder`

`npm install --save sqlite3`

`npm run postinstall`