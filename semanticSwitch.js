var semanticSwitch = function ( inputPredicate ) {
    this.inputPredicate = inputPredicate;
    this.matched = false;
};

var runFunc = function ( func ) {
    if ( typeof ( func ) === 'function' ) {
        func ();
    }
};

semanticSwitch.prototype.Case = function ( predicate, func ) {
    if ( ! this.matched ) {
        if ( predicate === this.inputPredicate ) {
            this.matched = true;
            runFunc ( func );
        }
    }

    return this;
};

semanticSwitch.prototype.Default = function ( func ) {
    if ( ! this.matched ) {
        runFunc ( func );
    }

    return;
};

exports.semanticSwitch = semanticSwitch;
