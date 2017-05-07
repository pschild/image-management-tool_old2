# ImageManagementTool

## npm scripts
`npm run build-electron`: Build app in dist-folder and copy electron files and server files

`npm run electron`: see `build-electron` and run electron

`npm run electron-win`: see `build-electron` and package app for Windows OS

see https://github.com/electron-userland/electron-packager

## Use SQLite with Electron
To make sqlite work with electron, the following steps were necessary:

1. `npm install -g node-gyp`
2. see https://github.com/nodejs/node-gyp:  
   1. `npm install --global --production windows-build-tools` (admin console) (this also installs Python 2.7 and Visual Studio Build Tools)
   2. `npm config set msvs_version 2015 --global`
3. Add python (%USERPROFILE%\.windows-build-tools\python27) to PATH in Windows.
4. `npm install --save-dev electron-builder` and `npm install --save sqlite3`
5. Add to `scripts` in `package.json`:  
   `"scripts": {
      "postinstall": "install-app-deps"
      ...
   }`
6. `npm run postinstall`
7. Create the file `server/db/image-management-tool.db` before the first start.
