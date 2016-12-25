# RainbowLogs
Colorized logger for JS console.

#### Motivation

Sometimes I'm too lazy to step through the debugger, so I put in print statements.
I don't always remember to remove them which can reveal implementation details.
I prefer the console to be silent in production.
This library allows one to configure the log level for a particular environment.
It also adds other niceties such as colorization and stack tracing.

#### How To

Instantiate the logger.

```javascript
var logger = new RainbowLogs.Logger();
```

Call logging functions.

```javascript
logger.debug("debug message");
logger.error("error message");
```

That's it.

Leave log statements in. Use them as documentation. Disable messages in production by setting log level to NONE.
Log [level](https://github.com/zenbrane/RainbowLogs/blob/master/RainbowLogs.js#L179),
[stack trace](https://github.com/zenbrane/RainbowLogs/blob/master/RainbowLogs.js#L191),
and other options can be set with library functions.
For further explanation, open the dev console and load
[example.html](https://github.com/zenbrane/RainbowLogs/blob/master/example.html).

#### Support

This library relies on [Error.prototype.stack](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/stack),
a non-standard feature. It has been verified to work with Chrome 55 and Firefox 50.
