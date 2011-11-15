The Blurb
=========

*rhino-hax* is what it says it is, a bunch of hacks:

You want me to require WHAT?!!? - modules/polyglot.js
-----------------------------------------------------
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


