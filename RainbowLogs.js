/*
 * Author: Tai H. Nguyen
 */
(function(){

    window.RainbowLogs =  new function() {

        this.LogLevels = {
            ALL: 0,
            TRACE: 1,
            DEBUG: 2,
            INFO: 3,
            WARN: 4,
            ERROR: 5,
            FATAL: 6,
            NONE: 7,
            OFF: 7 // alias for NONE
        };

        this.Colors = {
            RED: "red",
            ORANGE: "orange",
            YELLOW: "yellow",
            GREEN: "green",
            BLUE: "blue",
            PURPLE: "purple",
            BLACK: "black",
            WHITE: "white"
        };

        this.FontWeights = {
            NORMAL: 400,
            BOLD: 900
        };

        this.getPosition = function(string, subString, index) {
            return string.split(subString, index).join(subString).length;
        };

        // constructor
        this.Logger = function() {

            // default log level
            // only log messages at or above this level will be printed
            this.logLevel = RainbowLogs.LogLevels.ALL;

            // show stack trace by default
            this.withStackTrace = true;

            // show a stack depth of up to 10 by default
            this.maxStackDepth = 10;

            // map from level to color
            this.levelToColor = {
                TRACE: RainbowLogs.Colors.PURPLE,
                DEBUG: RainbowLogs.Colors.BLUE,
                INFO: RainbowLogs.Colors.GREEN,
                WARN: RainbowLogs.Colors.ORANGE,
                ERROR: RainbowLogs.Colors.RED,
                FATAL: RainbowLogs.Colors.WHITE
            };
        };

        this.Logger.prototype.print = function(msg, color, background, fontWeight) {

            // create color string
            c = "background: "+background+"; color: "+color+"; font-weight: "+fontWeight+";";

            // add the stack trace
            if (this.withStackTrace) {
                // trim the stack trace
                // the first three lines of the stack are from this library, and is uninformative
                var err = new Error();
                var start = RainbowLogs.getPosition(err.stack, "\n", 4);
                var end = RainbowLogs.getPosition(err.stack, "\n", this.maxStackDepth + 4);
                var stack = err.stack.substring(start, end);
                msg = msg + "\n Cause:"+stack;
            }

            console.log('%c %s', c, msg);
        };
        
        this.Logger.prototype.log = function(msg, color, background, fontWeight, level) {

            // default color to black
            if (typeof color === 'undefined' || color === null) {
                color = RainbowLogs.Colors.BLACK;
            }

            // default background to white
            if (typeof background === 'undefined' || background === null) {
                background = RainbowLogs.Colors.WHITE;
            }

            // default fontWeight to normal
            if (typeof background === 'undefined' || background === null) {
                background = RainbowLogs.FontWeights.NORMAL;
            }

            // default level to highest level
            if (typeof level === 'undefined' || level === null) {
                level = RainbowLogs.LogLevels.FATAL;
            }

            // print only if level is sufficient
            if (level >= this.logLevel) {
                this.print(msg+" ", color, background, fontWeight);
            }
        };

        this.Logger.prototype.setLogLevelAll = function() {
            this.logLevel = RainbowLogs.LogLevels.ALL;
        };
        
        this.Logger.prototype.setLogLevelTrace = function() {
            this.logLevel = RainbowLogs.LogLevels.TRACE;
        };
        
        this.Logger.prototype.setLogLevelDebug = function() {
            this.logLevel = RainbowLogs.LogLevels.DEBUG;
        };
        
        this.Logger.prototype.setLogLevelInfo = function() {
            this.logLevel = RainbowLogs.LogLevels.INFO;
        };
        
        this.Logger.prototype.setLogLevelWarn = function() {
            this.logLevel = RainbowLogs.LogLevels.WARN;
        };
        
        this.Logger.prototype.setLogLevelError = function() {
            this.logLevel = RainbowLogs.LogLevels.ERROR;
        };
        
        this.Logger.prototype.setLogLevelFatal = function() {
            this.logLevel = RainbowLogs.LogLevels.FATAL;
        };
        
        this.Logger.prototype.setLogLevelNone = function() {
            this.logLevel = RainbowLogs.LogLevels.NONE;
        };

        this.Logger.prototype.setLogLevelOff = function() {
            this.logLevel = RainbowLogs.LogLevels.OFF;
        };
        this.Logger.prototype.trace = function(msg) {
            this.log("TRACE "+msg, this.levelToColor.TRACE, null, null, RainbowLogs.LogLevels.TRACE);
        };

        this.Logger.prototype.debug = function(msg) {
            this.log("DEBUG "+msg, this.levelToColor.DEBUG, null, null, RainbowLogs.LogLevels.DEBUG);
        };

        this.Logger.prototype.info = function(msg) {
            this.log("INFO "+msg, this.levelToColor.INFO, null, null, RainbowLogs.LogLevels.INFO);
        };

        this.Logger.prototype.warn = function(msg) {
            this.log("WARN "+msg, this.levelToColor.WARN, null, null, RainbowLogs.LogLevels.WARN);
        };

        this.Logger.prototype.error = function(msg) {
            this.log("ERROR "+msg, this.levelToColor.ERROR, null, null, RainbowLogs.LogLevels.ERROR);
        };

        this.Logger.prototype.fatal = function(msg) {
            this.log("FATAL "+msg, this.levelToColor.FATAL, RainbowLogs.Colors.BLACK, RainbowLogs.FontWeights.BOLD, RainbowLogs.LogLevels.FATAL);
        };

        this.Logger.prototype.showStackTrace = function() {
            this.withStackTrace = true;
        };

        this.Logger.prototype.hideStackTrace = function() {
            this.withStackTrace = false;
        };

        this.Logger.prototype.setMaxStackDepth = function(n) {
            this.maxStackDepth = n;
        };

        console.log("RainbowLogs initialized.");
    };
})();
