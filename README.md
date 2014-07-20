# Supporter HTML5 Mobile App #

## Tech Stack ##

* Phonegap/Cordova
* Node.js
* Backbone
* Underscore
* Handlebars
* jQuery/Zepto
* Foundation
* Gulp
* RequireJS
* Less/Sass

## Getting Started ##

```
npm install cordova -g
npm install gulp -g
npm install
npm start
```
Now open: http://localhost:3000

## Deployment ##

Test that app on the browser:

```
gulp
NODE_ENV=production npm start
```
Now open: http://localhost:3000

Prepare app for iOS/Android:

```
cordova platform add ios
cordova platform add android
```

Test the app on emulator (iPhone/Android):

```
cordova build
cordova run ios
cordova run android
```

Finally go to [Phonegap Build](http://build.phonegap.com) update code and rebuild all

## Foundation ##

http://foundation.zurb.com/docs/

http://foundation.zurb.com/docs/components/buttons.html
http://foundation.zurb.com/docs/components/forms.html
http://foundation.zurb.com/docs/components/grid.html
http://foundation.zurb.com/docs/utility-classes.html
