SemanticSwitch
==============

the switch statement, reimagined, semantically
--------------

acts as a drop-in replacement for the switch statement.

Install like this:
    
    npm install semantic-switch

It is used like this:

    var SemanticSwitch = require ( 'semantic-switch' ).SemanticSwitch;

    new SemanticSwitch ( true )
        .Case ( false, function () {
            console.log ( 'This will not be executed' );
        } )
        .Case ( true, function () {
            console.log ( 'This will be executed' );
        } )
        .Default ( function () {
            console.log ( 'This will only be executed if none of the predicates match' );
        } );

            
