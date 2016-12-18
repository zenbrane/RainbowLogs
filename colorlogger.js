(function(){
    window.colorlogger = new function() {

        this.getPosition = function(string, subString, index) {
            return string.split(subString, index).join(subString).length;
        }

        this.withStackTrace = true;

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

        this.LogLevels = {
            ALL: 0,
            TRACE: 1,
            DEBUG: 2,
            INFO: 3,
            WARN: 4,
            ERROR: 5,
            FATAL: 6,
            OFF: 7
        };

        // default log level
        // only log messages at or above this level will be printed
        this.logLevel = this.LogLevels.ALL;

        this.levelToColor = {
            TRACE: this.Colors.PURPLE,
            DEBUG: this.Colors.BLUE,
            INFO: this.Colors.GREEN,
            WARN: this.Colors.ORANGE,
            ERROR: this.Colors.RED,
            FATAL: this.Colors.WHITE
        };

        this.print = function(msg, color, background, fontWeight) {

            // create color string
            c = "background: "+background+"; color: "+color+"; font-weight: "+fontWeight+";";


            // add the stack trace
            if (this.withStackTrace) {
                // trim the stack trace
                // the first three lines of the stack are from this library, and is uninformative
                var err = new Error();
                var n = cl.getPosition(err.stack, "\n", 4);
                msg = msg + "\n Caused by:"+err.stack.substring(n)
            }

            console.log('%c %s', c, msg);
        }

        this.log = function(msg, color, background, fontWeight, level) {

            // default color to black
            if (typeof color === 'undefined' || color === null) {
                color = this.Colors.BLACK;
            }

            // default background to white
            if (typeof background === 'undefined' || background === null) {
                background = this.Colors.WHITE;
            }

            // default fontWeight to normal
            if (typeof background === 'undefined' || background === null) {
                background = this.FontWeights.NORMAL;
            }

            // default level to highest level
            if (typeof level === 'undefined' || level === null) {
                level = this.LogLevels.FATAL;
            }

            // print only if level is sufficient
            if (level >= this.logLevel) {
                this.print(msg+" ", color, background, fontWeight);
            }
        };

        this.trace = function(msg) {
            this.log("TRACE "+msg, this.levelToColor.TRACE, null, null, this.LogLevels.TRACE);
        };

        this.debug = function(msg) {
            this.log("DEBUG "+msg, this.levelToColor.DEBUG, null, null, this.LogLevels.DEBUG);
        };

        this.info = function(msg) {
            this.log("INFO "+msg, this.levelToColor.INFO, null, null, this.LogLevels.INFO);
        };

        this.warn = function(msg) {
            this.log("WARN "+msg, this.levelToColor.WARN, null, null, this.LogLevels.WARN);
        };

        this.error = function(msg) {
            this.log("ERROR "+msg, this.levelToColor.ERROR, null, null, this.LogLevels.ERROR);
        };

        this.fatal = function(msg) {
            this.log("FATAL "+msg, this.levelToColor.FATAL, this.Colors.BLACK, this.FontWeights.BOLD, this.LogLevels.FATAL);
        };
    }();
})();
