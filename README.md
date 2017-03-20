# ImageManagementTool

## Tutorial
`ng build -prod`: Build app in dist-folder

`npm run elec`: Run Electron with app and starts express server on port 1234 in the background

`npm run elec-win`: build electron app as exe

=> see https://github.com/electron-userland/electron-packager

## Developing
To make sqlite work with electron, do the following steps:

`npm install -g node-gyp` (optional?)

see https://github.com/nodejs/node-gyp:
`npm install --global --production windows-build-tools` (admin console)
`npm config set msvs_version 2015 [--global]`

see http://stackoverflow.com/a/41230765
"scripts": {
   "postinstall": "install-app-deps"
   ...
}

`npm install --save-dev electron-builder`
`npm install --save sqlite3`
`npm run postinstall`