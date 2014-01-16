SemanticSwitch
==============

the switch statement, reimagined, semantically
--------------

acts as a drop-in replacement for the switch statement.

*idea & implementation pattern proposed by [Mat Carey](https://github.com/matcarey)*

**Install like this:**
    
    npm install semantic-switch

**Use like this:**

    var SemanticSwitch = require ( 'semantic-switch' ).SemanticSwitch;

    new SemanticSwitch ( true )
        .CASE ( false, function () {
            console.log ( 'This will not be executed' );
        } )
        .CASE ( true, function () {
            console.log ( 'This will be executed' );
        } )
        .DEFAULT ( function () {
            console.log ( 'This will only be executed if none of the predicates match' );
        } );

            
