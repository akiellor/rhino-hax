#The Blurb
**rhino-hax** is what it says it is, a bunch of hacks...with [rhino](https://github.com/mozilla/rhino):

##You want me to require WHAT?!!? - [polyglot.js](rhino-hax/blob/master/modules/polyglot.js)
Allows you to require any language compilable to javascript.

```javascript
var polyglot = require('polyglot').polyglot();
polyglot.register('coffee', require('coffee-script').CoffeeScript.compile);

polyglot.require('something-written-in-coffee')
```

and if your feeling daring.

```javascript
require = polyglot.require;
```

##Yet another Jasmine runner :)
You know that whole DOM independence thing jasmine talks about, not so true.

Jasmine requires setTimeout/setInterval timers, which are part of the DOM, node.js
conveniently provides these timers, rhino does not.

These guys do the heavy lifting.

1. [spec.js](rhino-hax/blob/master/spec.js) - gives it the boot.
2. [jasmine-console-runner.coffee](rhino-hax/blob/master/modules/jasmine-console-runner.coffee) - a little runner.
3. [jasmine-console-reporter.js](rhino-hax/blob/master/modules/jasmine-console-reporter.js) and [jasmine.js](rhino-hax/blob/master/modules/jasmine.js) - looks suprisingly similar to files from [pivotal/jasmine](https://github.com/pivotal/jasmine)
4. [timers.coffee](rhino-hax/blob/master/modules/timers.coffee) - those blasted timers.

##Rhino, Jetty, Servlet, Sinatra...tokenTechnologyN + 1.
Ever wanted to write a servlet in javascript...ME TOO!

1. [main.js](rhino-hax/blob/master/main.js) - boots it all.
2. [app.coffee](rhino-hax/blob/master/app.coffee) - foo/barred ping/pong app.
3. [sinatra.coffee](rhino-hax/blob/master/modules/sinatra.coffee) - Gets you writing some sinatra style ditties.
4. [http.coffee](rhino-hax/blob/master/modules/http.coffee) - Some stuff to get jetty off its ass.

##IDEAZ
URLS for loading deps? Respects cache headers...

```javascript
var jasmine = require("https://github.com/pivotal/jasmine/blob/master/lib/jasmine-core/jasmine.js")
```
